import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import {
  BubbleDataPoint,
  ChartData,
  ChartDataset,
  ChartType,
  ChartTypeRegistry,
  DefaultDataPoint,
  ScatterDataPoint
} from 'chart.js';
import { IData } from 'src/app/interfaces/local';
import { BehaviorSubject } from 'rxjs';
import { Context } from 'chartjs-plugin-datalabels/types/context';

@Injectable({
  providedIn: 'root'
})
export class ChartsDataService {
  private readonly elements = [
    'N-NO3', 'N-NH4', 'P', 'K', 'Ca', 'Mg', 'S', 'Cl', 'Fe', 'Zn', 'B', 'Mn', 'Cu', 'Mo',
  ];

  private newChartsData$: BehaviorSubject<any>
    = new BehaviorSubject({
      datasets: [],
      labels: [...this.elements],
    }
  );

  public formattedCharts$ = this.newChartsData$.asObservable();

  constructor(private dataService: DataService) {
    this.dataService.selectedChartsData$.subscribe(charts => {
      const newChartsData: ChartData<ChartType, DefaultDataPoint<ChartType>, unknown> = {
        datasets: [],
        labels: [...this.elements],
      }
      charts.forEach((chart) => {
        const [newChart1, newChart2] = this.chartDataConverter(chart);
        newChartsData.datasets.push(newChart1, newChart2)
      })

      this.newChartsData$.next(newChartsData);
    })

  }

  private chartDataConverter(chart: IData): ChartDataset<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[]>[] {
    const hightValueElements: Array<number | null | never> = [];
    const lowValueElements: Array<number | null | never> = [null, null, null, null, null, null, null, null];
    // Set common colors for charts
    const backgroundColor = this.get_random_color(0.2);
    const borderColor = this.get_random_color(1);
    const pointBackgroundColor = this.get_random_color(1);
    const pointHoverBorderColor = this.get_random_color(0.8);

    const newChartHight = {
      type: 'line',
      data: [], // Data
      label: chart.name, // Chart name
      yAxisID: 'y',
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      pointBackgroundColor: pointBackgroundColor,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: pointHoverBorderColor,
      fill: 'origin',
      dataLabels: {
        display: false,
      }
    } as ChartDataset;

    const newChartLow = {
      type: 'bar',
      data: [], // Data
      label: chart.name, // Chart name
      yAxisID: 'y1',
      borderWidth: 1,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      pointBackgroundColor: pointBackgroundColor,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: pointHoverBorderColor,
      fill: 'origin',
      datalabels: {
        display: function(context: Context) {
          if(context) {
            // @ts-ignore: Object is possibly 'null'
            return context.dataset.data[context.dataIndex] > 0;
          }
          return undefined;
        },
        clamp: true,
        anchor: 'end',
        align: 'end',
        offset: 10,
        rotation: -90,
        color: 'rgba(255,0,0,0.9)',
        formatter: function (value: string, context): number | void {
          return parseFloat(value);
        },
        font: {
          weight: 'bold',
        }
      }
    } as ChartDataset;

    chart.chartData.forEach((dataObj, index) =>
      (index < 8)
      ? hightValueElements.push(dataObj.value)
      : lowValueElements.push(dataObj.value)
    ); // push data

    newChartHight.data = [...hightValueElements];
    newChartLow.data= [...lowValueElements];

    return [newChartHight, newChartLow];
  }

  private randomBetween(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  private get_random_color(alfa: number): string {
    const r = this.randomBetween(0, 255);
    const g = this.randomBetween(0, 255);
    const b = this.randomBetween(0, 255);

    return `rgb(${r},${g},${b},${alfa})`; // Collect all to a css color string
  }
}
