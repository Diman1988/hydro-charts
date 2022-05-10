import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsMainPageContainerComponent } from './charts/containers/charts-main-page/charts-main-page.container';

const routes: Routes = [
  {
    path: '',
    component: ChartsMainPageContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
