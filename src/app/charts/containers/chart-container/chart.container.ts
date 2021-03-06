import { Component, OnInit } from '@angular/core';
import { ChartData, ChartTypeRegistry, ScatterDataPoint, BubbleDataPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { ChartsDataService } from 'src/app/services/chartsData/charts-data.service';
import { DataService } from 'src/app/services/data/data.service';
import { ResolutionService } from 'src/app/services/resolution/resolution.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart.container.html',
  styleUrls: ['./chart.container.scss']
})
export class ChartContainerContainerComponent implements OnInit {
  public selected$: Observable<number[]>;

  public charts$: Observable<ChartData<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown> | null | undefined>;

  public isTablet$!: Observable<boolean>;

  public isMobile$!: Observable<boolean>;

  public chartWidth: number;

  constructor(
    public dataService$: DataService,
    private chartsDataService$: ChartsDataService,
    public resolutionService: ResolutionService,
  ) {
    this.selected$ = this.dataService$.selected$;
    this.charts$ = this.chartsDataService$.formattedCharts$
    this.chartWidth = Math.floor(window.innerWidth * 0.45)
  }

  ngOnInit(): void {
    this.resolutionService.isMobileResolution()
    .subscribe(
      subscriber => (subscriber) ? this.chartResize('mobile') : undefined,
    );

    this.resolutionService.isTabletResolution()
    .subscribe(
      subscriber => (subscriber) ? this.chartResize('tablet') : undefined,
    );
  }

  private chartResize(type: 'tablet' | 'mobile' | 'large') {
    switch(type) {
      case 'tablet': this.chartWidth = Math.floor(window.innerWidth * 0.8); break;
      case 'mobile': this.chartWidth = Math.floor(window.innerWidth * 0.7); break;
      default: this.chartWidth = Math.floor(window.innerWidth * 0.45); break;
    }
  }
}
