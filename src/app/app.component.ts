import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResolutionService } from './services/resolution/resolution.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'hydro-charts';

  public isLarge: Observable<boolean>;

  constructor(resolutionService: ResolutionService) {
    this.isLarge = resolutionService.isLargeResolution();
  }
}
