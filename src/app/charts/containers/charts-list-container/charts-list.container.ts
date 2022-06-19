import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from 'src/app/interfaces/local';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-charts-list-container',
  templateUrl: './charts-list.container.html',
  styleUrls: ['./charts-list.container.scss']
})
export class ChartsListContainerComponent implements OnInit {
  public chartsDataList$: Observable<IData[]> = new Observable<IData[]>();

  get selected(): number[] {
    let selectedArr: Array<number> = [];

    this.dataService.selected$.subscribe(value => {
      selectedArr = [...value];
    });

    return selectedArr;
  }

  set selected(value: number[]) {
    this.dataService.setSelected(value);
    this.dataService.getSelectedCharts();
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.chartsDataList$ = this.dataService.serverChartsData$
  }
}
