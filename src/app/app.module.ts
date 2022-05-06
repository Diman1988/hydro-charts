import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsMainPageComponent } from './charts/charts-main-page/charts-main-page.component';
import { ChartsModule } from './charts/charts.module';
import { AuthService } from './services/auth/auth.service';
import { ServerService } from './services/server/server.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartsMainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
  ],
  providers: [AuthService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
