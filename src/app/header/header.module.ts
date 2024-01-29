import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';

import { containers } from './containers';
import { components } from './components';
import { HeaderContainerComponent } from './containers/header-container/header-container';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
  ],
  exports: [HeaderContainerComponent],
})
export class HeaderModule {}
