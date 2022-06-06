import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChartsListContainerComponent } from './charts-list.container';

describe('ChartsListContainerComponent', () => {
  let component: MenuChartsListContainerComponent;
  let fixture: ComponentFixture<MenuChartsListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuChartsListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChartsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
