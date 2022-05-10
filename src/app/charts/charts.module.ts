import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { containers } from './containers';
import { components } from './components';


@NgModule({
  declarations: [
    ...containers,
    ...components,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
  ],
})
export class ChartsModule { }
