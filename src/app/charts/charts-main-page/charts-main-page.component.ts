import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-charts-main-page',
  templateUrl: './charts-main-page.component.html',
  styleUrls: ['./charts-main-page.component.scss']
})
export class ChartsMainPageComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.login('admin@npkcalc.com', '1');
   }

  ngOnInit(): void {

  }

}
