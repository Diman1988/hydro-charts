import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-charts-main-page',
  templateUrl: './charts-main-page.container.html',
  styleUrls: ['./charts-main-page.container.scss']
})
export class ChartsMainPageContainerComponent implements OnInit {
  @Input() selected: number;

  public images: Array<any> = [];

  constructor(private authService: AuthService, private dataService: DataService) {
    console.log('Charts main component')
  }

  ngOnInit(): void {
    this.authService.login('admin@npkcalc.com', '1');

    this.dataService.svg$.subscribe(img => console.log(img));
  }

  ngOnChange():void {
    console.log(this.selected);
  }

  public setSelected($event) {
    console.log($event);
  }
}
