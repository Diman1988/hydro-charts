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
  public chartsDataList$: Observable<IData[]>

  constructor(private dataService: DataService) {
    this.chartsDataList$ = dataService.chartsData$;
  }

  ngOnInit(): void {
  }

  public setCharts($event) {
    console.log($event);
    this.dataService.setSelected($event);
  }
}
