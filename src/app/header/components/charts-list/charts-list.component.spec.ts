import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChartsListComponent } from './charts-list.component';

describe('MenuChartsListComponent', () => {
  let component: MenuChartsListComponent;
  let fixture: ComponentFixture<MenuChartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuChartsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
