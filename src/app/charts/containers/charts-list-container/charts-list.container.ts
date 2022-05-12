import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from 'src/app/interfaces/local';
import { ChartsDataService } from 'src/app/services/chartsData/charts-data.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-charts-list-container',
  templateUrl: './charts-list.container.html',
  styleUrls: ['./charts-list.container.scss']
})
export class ChartsListContainerComponent implements OnInit {
  public chartsDataList$: Observable<IData[]>

  get selected(): number[] {
    let selectedArr = [];

    this.dataService.selected$.subscribe(value => {
      selectedArr = [...value];
    });

    return selectedArr;
  }

  set selected(value: number[]) {
    this.dataService.setSelected(value);
    this.dataService.getSelectedCharts();
  }

  constructor(private dataService: DataService, private chartsDataService: ChartsDataService) {
  }

  ngOnInit(): void {
    this.chartsDataList$ = this.dataService.serverChartsData$
  }
}
