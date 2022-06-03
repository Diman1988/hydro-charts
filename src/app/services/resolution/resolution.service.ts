import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  private isMobile: boolean;

  private isTablet: boolean;

  constructor() {
    this.isMobile = (window.innerWidth > 320 && window.innerWidth <= 480) ? true  : false;
    this.isTablet = (window.innerWidth > 481 && window.innerWidth < 768) ? true  : false;
  }

  public isMobileResolution(): boolean {
    return this.isMobile;
  }

  public isTabletResolution(): boolean {
    return this.isTablet;
  }
}
