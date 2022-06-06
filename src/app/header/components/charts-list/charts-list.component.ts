import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IData } from 'src/app/interfaces/local';

@Component({
  selector: 'app-menu-charts-list',
  templateUrl: './charts-list.component.html',
  styleUrls: ['./charts-list.component.scss']
})
export class MenuChartsListComponent implements OnInit {
  @Input() chartsData: IData[];

  @Input() selected: number[] = [];

  @Output() selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  public addSelectedChart(id: number): void {
    const newSelected = [...this.selected];

    if (this.isSelected(id)) {
      this.selectedChange.emit(newSelected.filter((value) => value !== id));
    } else {
      newSelected.push(id);
      this.selectedChange.emit(newSelected);
    }
  }

  public isSelected(id: number): boolean {
    return (this.selected.some(checkingElement => checkingElement === id)) ? true : false;
  }
}
