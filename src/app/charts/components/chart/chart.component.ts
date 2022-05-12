import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() lineChartData: ChartConfiguration['data'];

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
        },
      },
      // 'y-axis-0': {
      //     position: 'left',
      //     // stacked: true,
      // },
      // 'y-axis-1': {
      //   // stacked: false,
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     color: 'red'
      //   }
      // }
    },
    plugins: {
      legend: { display: false },
    }
  };

  constructor() { }

  ngOnInit(): void { }

  ngOnChange() {
    console.log(this.lineChartData);
  }

}
