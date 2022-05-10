import { Component, OnInit } from '@angular/core';
import { ChartData, ChartTypeRegistry, ScatterDataPoint, BubbleDataPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { ChartsDataService } from 'src/app/services/chartsData/charts-data.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart.container.html',
  styleUrls: ['./chart.container.scss']
})
export class ChartContainerContainerComponent implements OnInit {
  public selected$: Observable<number[]>;

  public charts$: Observable<ChartData<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>>;

  constructor(public dataService$: DataService, private chartsDataService$: ChartsDataService) {
    this.selected$ = this.dataService$.selected$;
    this.charts$ = this.chartsDataService$.newCharts$;
  }

  ngOnInit(): void {
    this.charts$.subscribe(s => console.log(s))
  }

}
