import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from './charts/charts.module';
import { AuthService } from './services/auth/auth.service';
import { ChartsDataService } from './services/chartsData/charts-data.service';
import { DataService } from './services/data/data.service';
import { ResolutionService } from './services/resolution/resolution.service';
import { ServerService } from './services/server/server.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
  ],
  providers: [AuthService, ServerService, DataService, ChartsDataService, ResolutionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
