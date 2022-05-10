import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsListContainerComponent } from './charts-list-container.component';

describe('ChartsListContainerComponent', () => {
  let component: ChartsListContainerComponent;
  let fixture: ComponentFixture<ChartsListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
