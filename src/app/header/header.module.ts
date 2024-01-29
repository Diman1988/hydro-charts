import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

import { containers } from './containers';
import { components } from './components';
import { HeaderContainerComponent } from "./containers/header-container/header-container";

@NgModule({
  declarations: [
    ...components,
    ...containers,
  ],
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
export class HeaderModule {};
