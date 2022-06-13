import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { ResolutionService } from 'src/app/services/resolution/resolution.service';

@Component({
  selector: 'app-charts-main-page',
  templateUrl: './charts-main-page.container.html',
  styleUrls: ['./charts-main-page.container.scss']
})
export class ChartsMainPageContainerComponent implements OnInit {
  @Input() selected: number;

  public images: Array<any> = [];

  public isTablet$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public isLarge$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    public resolutionService: ResolutionService,
  ) {
    console.log('Charts main component')
  }

  ngOnInit(): void {
    this.authService.login('admin@npkcalc.com', '1');

    this.isMobile$ = this.resolutionService.isMobileResolution();
    this.isTablet$ = this.resolutionService.isTabletResolution();
    this.isLarge$ = this.resolutionService.isLargeResolution();
  }

  ngOnChange():void {
    // console.log(this.selected);
  }

  public setSelected($event) {
    // console.log($event);
  }
}
