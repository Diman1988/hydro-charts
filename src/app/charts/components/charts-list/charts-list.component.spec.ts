import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsListComponent } from './charts-list.component';

describe('ChartsListContainerComponent', () => {
  let component: ChartsListComponent;
  let fixture: ComponentFixture<ChartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
