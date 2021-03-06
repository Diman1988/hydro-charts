import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, withLatestFrom } from 'rxjs';
import { Calculator, Flat_npkcalc } from 'src/app/interfaces/rpc';
import { make_ref, Flat, narrow } from 'nprpc';
import { ServerService } from '../server/server.service';
import { IData, IElement } from './../../interfaces/local';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private calculator: Calculator | null;

  private get_image(type: string, abuf: ArrayBuffer) {
    return URL.createObjectURL(new Blob([abuf], {type: type}));
  }

	private get_image_svg(abuf: ArrayBuffer) : string {
		return this.get_image('image/svg+xml', abuf);
	}

  private readonly svgRef = make_ref<Flat.Vector_Direct2<Flat_npkcalc.Media_Direct>>();

  private readonly solutionRef = make_ref<Flat.Vector_Direct2<Flat_npkcalc.Solution_Direct>>();

  private readonly fertilizerRef = make_ref<Flat.Vector_Direct2<Flat_npkcalc.Fertilizer_Direct>>();

  private readonly selectedChartsList$ = new BehaviorSubject<Array<number>>([]);

  private readonly serverChartsDataSubject$ = new BehaviorSubject<IData[]>([]);

  private readonly selectedChartsDataSubject$ = new BehaviorSubject<IData[]>([]);

  private readonly svgSubject$ = new BehaviorSubject<string[]>([]);

  public selected$ = this.selectedChartsList$.asObservable();

  public selected2$ = from(this.selectedChartsList$.getValue());

  public selectedChartsData$ = this.selectedChartsDataSubject$.asObservable();

  public serverChartsData$ = this.serverChartsDataSubject$.asObservable();

  public svg$ = this.svgSubject$.asObservable();

  constructor(private serverService$: ServerService) {
    this.calculator = this.serverService$.rpc
      ? narrow(this.serverService$.rpc.host_info.objects.calculator, Calculator)
      : null;
    this.getSvgData();
    this.getChartsData();
    console.log('data service');
  }

  public setSelected(value: number[]): void {
    this.selectedChartsList$.next(value);
    this.selected2$ = from(this.selectedChartsList$.getValue());
    this.getSelectedCharts();
  }

  public getSelectedCharts(): void {
    this.serverChartsData$ // Data which should be filtered
      .pipe(
        withLatestFrom(this.selected$), // Array with id
        map(([chartsData, id]) => {
          return chartsData.filter( // Check an id
              chart => id.some(idElement => chart.id === idElement)
            );
        }),
      )
      .subscribe(value => this.selectedChartsDataSubject$.next(value));
  }

  private getSvgData(): void {
    if (this.calculator) {
      from(this.calculator.GetImages(this.svgRef))
        .subscribe(() => {
          const svgArray: Array<string> = [];

          this.svg$.subscribe(
            {
              next: () => Array.from(this.svgRef.value)
                            .forEach(svg => svgArray.push(this.get_image_svg(svg.data_vd().array_buffer))),
              error: (e) => console.log(e),
            }
          )

          this.svgSubject$.next(svgArray);
        });
    }
  }

  private getChartsData(): void {
    if(this.calculator) {
      from(this.calculator.GetData(this.solutionRef, this.fertilizerRef))
        .subscribe(v => {
          const solutions: IData[] = [];

          Array.from(this.solutionRef.value)
            .forEach(v => {
              solutions.push(
                {
                  id: v.id,
                  name: v.name,
                  owner: v.owner,
                  chartData: this.getElementsWithValue(<Flat.Array_Direct1_float64[]>Array.from(v.elements_vd())),
                }
              )
            });

          this.serverChartsDataSubject$.next(solutions);
          console.log('get charts');
          Array.from(this.fertilizerRef.value)
            // .forEach(v => console.log('<f>', v.formula, '</f>'));
        });
    }
  }

  private getElementsWithValue(values: Flat.Array_Direct1_float64[]): IElement[] {
    const index_to_name = ["N-NO3", "N-NH4", "P", "K", "Ca", "Mg", "S", "Cl", "Fe", "Zn", "B", "Mn", "Cu", "Mo"];

    const elements: IElement[] = [];

    values.forEach((value, index) => {
      elements.push(
        {
          name: index_to_name[index],
          value: parseFloat(<string><unknown>value),
        }
      )
    });

    return elements;
  }
}
