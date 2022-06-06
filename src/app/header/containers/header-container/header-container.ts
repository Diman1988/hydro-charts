import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.html',
  styleUrls: ['./header-container.scss']
})
export class HeaderContainerComponent implements OnInit {
  private isOpenSbj$ = new BehaviorSubject(false);

  public isOpen$ = this.isOpenSbj$.asObservable()
  constructor() { }

  ngOnInit(): void {
  }

  public openMenu(): void {
    this.isOpenSbj$.next(!this.isOpenSbj$.getValue());
  }
}
