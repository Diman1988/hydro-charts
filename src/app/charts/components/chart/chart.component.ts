import { Component, Input, OnInit } from '@angular/core';
import { BubbleDataPoint, ChartConfiguration, ChartData, ChartType, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() lineChartData!: ChartData<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown> | undefined | null;

  @Input() chartWidth: number = 0;

  public pluginChars = [DataLabelsPlugin];

  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        }
      },
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: false,
      }
    },
  };

  constructor() { }

  ngOnInit(): void {
    console.warn("canvas init width:", this.chartWidth);
  }

  ngOnChange() {
    console.warn("canvas change width:", this.chartWidth);
    console.log(this.lineChartData);
  }
}
