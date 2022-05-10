import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartContainerContainerComponent } from './chart.container';

describe('ChartContainerComponent', () => {
  let component: ChartContainerContainerComponent;
  let fixture: ComponentFixture<ChartContainerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartContainerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartContainerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
