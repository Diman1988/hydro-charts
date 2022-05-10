import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import * as npkcalc from 'src/app/interfaces/rpc';
import * as NPRPC from 'nprpc/nprpc';
import { ServerService } from '../server/server.service';
import { IData, IElement } from './../../interfaces/local';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private calculator = new npkcalc.Calculator(
    {
      port: 0,
      object_id: 0n,
      poa_idx: 0,
      ip4: 0x7F000001,
      websocket_port: 33252,
      flags: 0,
      class_id: "",
    }
  );

  private get_image(type: string, abuf: ArrayBuffer) {
    return URL.createObjectURL(new Blob([abuf], {type: type}));
  }

	private get_image_svg(abuf: ArrayBuffer) : string {
		return this.get_image('image/svg+xml', abuf);
	}

  private readonly svgRef = NPRPC.make_ref<NPRPC.Flat.Vector_Direct2<npkcalc.Flat_npkcalc.Media_Direct>>();

  private readonly solutionRef = NPRPC.make_ref<NPRPC.Flat.Vector_Direct2<npkcalc.Flat_npkcalc.Solution_Direct>>();

  private readonly fertilizerRef = NPRPC.make_ref<NPRPC.Flat.Vector_Direct2<npkcalc.Flat_npkcalc.Fertilizer_Direct>>();

  private readonly selectedCharts$ = new BehaviorSubject<Array<number>>([]);

  private readonly chartsDataSubject$ = new BehaviorSubject<IData[]>([]);

  private readonly svgSubject$ = new BehaviorSubject<string[]>([]);

  public selected$ = this.selectedCharts$.asObservable();

  public chartsData$ = this.chartsDataSubject$.asObservable();

  public svg$ = this.svgSubject$.asObservable();

  constructor(private serverService$: ServerService) {
    this.getSvgData();
    this.getChartsData();
    console.log('data service');
  }

  public setSelected(value: number[]) {
    this.selectedCharts$.next(value);
  }

  private getSvgData(): void {
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

  private getChartsData(): void {
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
                chartData: this.getElementsWithValue(<NPRPC.Flat.Array_Direct1_float64[]>Array.from(v.elements_vd())),
              }
            )
          });

        this.chartsDataSubject$.next(solutions);

        Array.from(this.fertilizerRef.value)
          // .forEach(v => console.log('<f>', v.formula, '</f>'));
      });
  }

  private getElementsWithValue(values: NPRPC.Flat.Array_Direct1_float64[]): IElement[] {
    const index_to_name = ["N-NO3", "N-NH4", "P", "K", "Ca", "Mg", "S", "Cl", "Fe", "Zn", "B", "Mn", "Cu", "Mo"];

    const elements = [];

    values.forEach((value, index) => {
      elements.push(
        {
          name: index_to_name[index],
          value: value,
        }
      )
    });

    return elements;
  }
}
