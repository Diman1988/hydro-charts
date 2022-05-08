import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-charts-main-page',
  templateUrl: './charts-main-page.component.html',
  styleUrls: ['./charts-main-page.component.scss']
})
export class ChartsMainPageComponent implements OnInit {

  public images: Array<any> = [];

  constructor(private authService: AuthService, private dataService: DataService) {
    this.authService.login('admin@npkcalc.com', '1');

    dataService.svgObs$.subscribe(img => console.log(img));

    console.log('component')
  }

  ngOnInit(): void {

  }

}
