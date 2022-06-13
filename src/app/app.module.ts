import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from './charts/charts.module';
import { AuthService } from './services/';
import { ChartsDataService } from './services/';
import { DataService } from './services/';
import { ResolutionService } from './services/';
import { ServerService } from './services/';
import { HeaderModule } from './header/header.module';
import * as NPRPC from 'nprpc';

function initRpcFactory(service: ServerService): () => Promise<void | NPRPC.Rpc> {
  return () => service.rpcInit();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HeaderModule,
    AppRoutingModule,
    ChartsModule,
    CommonModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initRpcFactory,
      deps: [ServerService],
      multi: true,
    },
    AuthService,
    DataService,
    ChartsDataService,
    ResolutionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
