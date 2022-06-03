import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout"
import { distinctUntilChanged, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  private isMobile = new BehaviorSubject(false);

  private isTablet = new BehaviorSubject(false);

  private isLarge = new BehaviorSubject(false);

  private resolution$: Observable<BreakpointState>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.resolution$ = this.breakpointObserver
      .observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.Large
      ])
      .pipe(
        distinctUntilChanged(),
      );

    this.resolution$
      .subscribe(
        observer => {
          const isMobile = breakpointObserver.isMatched([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]);
          const isTablet = breakpointObserver.isMatched([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape]);

          this.isMobile.next(false);
          this.isTablet.next(false);

          if (isMobile) {
            this.isMobile.next(true);
          } else if (isTablet) {
            this.isTablet.next(true);
          } else {
            this.isLarge.next(true);
          }
        }
      )
  }

  ngOnInit() { }

  public isMobileResolution(): Observable<boolean> {
    return this.isMobile.asObservable();
  }

  public isTabletResolution(): Observable<boolean> {
    return this.isTablet.asObservable();
  }

  public isLargeResolution(): Observable<boolean> {
    return this.isLarge.asObservable();
  }

  public getResolution() {
    return this.resolution$;
  }
}
