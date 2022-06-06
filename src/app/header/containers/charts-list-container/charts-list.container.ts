import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from 'src/app/interfaces/local';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-menu-charts-list-container',
  templateUrl: './charts-list.container.html',
  styleUrls: ['./charts-list.container.scss']
})
export class MenuChartsListContainerComponent implements OnInit {
  // @Input() isOpen: Observable<boolean>;

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

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.chartsDataList$ = this.dataService.serverChartsData$
  }
}
