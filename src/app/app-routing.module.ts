import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsMainPageComponent } from './charts/charts-main-page/charts-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsMainPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
