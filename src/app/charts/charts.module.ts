import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { containers } from './containers';
import { components } from './components';
import { ChartsListComponent } from './components/charts-list/charts-list.component';

@NgModule({
  declarations: [
    ...containers,
    ...components,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  exports: [ChartsListComponent]
})
export class ChartsModule { }
