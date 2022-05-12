import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { ChartConfiguration } from 'chart.js';
import { IData } from 'src/app/interfaces/local';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsDataService {
  private readonly elements = [
    'N-NO3', 'N-NH4', 'P', 'K', 'Ca', 'Mg', 'S', 'S', 'Cl', 'Fe', 'Zn', 'B', 'Mn', 'Cu', 'Mo', 'CO3'
  ];

  private newChartsData$: BehaviorSubject<ChartConfiguration['data']> = new BehaviorSubject({
    datasets: [],
    labels: [...this.elements],
  });

  public formattedCharts$ = this.newChartsData$.asObservable();

  constructor(private dataService: DataService) {
    this.dataService.selectedChartsData$.subscribe(charts => {
      const newChartsData = [];

      charts.forEach((chart) => {
        newChartsData.push(this.chartDataConverter(chart))
      })

      this.newChartsData$.next({
        datasets: [...newChartsData],
        labels: [...this.elements],
      });
    })

    console.log('charts-service');
  }

  private chartDataConverter(chart: IData) {
    const newChart = {
      data: [], // Data
      label: chart.name, // Chart name
      backgroundColor: this.get_random_color(0.2),
      borderColor: this.get_random_color(1),
      pointBackgroundColor: this.get_random_color(1),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: this.get_random_color(0.8),
      fill: 'origin',
    };

    chart.chartData.forEach(dataObj => newChart.data.push(dataObj.value)); // push data

    return newChart;
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
