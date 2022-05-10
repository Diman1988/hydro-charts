import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IData } from 'src/app/interfaces/local';

@Component({
  selector: 'app-charts-list',
  templateUrl: './charts-list.component.html',
  styleUrls: ['./charts-list.component.scss']
})
export class ChartsListComponent implements OnInit {
  @Input() chartsData: IData[];

  @Input() selected: number;

  @Output() selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public selectChart(id: number) {
    this.selected = id;
    this.selectedChange.emit(id);
  }

}
