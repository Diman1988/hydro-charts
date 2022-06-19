import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMainPageContainerComponent } from './charts-main-page.container';

describe('ChartsMainPageComponent', () => {
  let component: ChartsMainPageContainerComponent;
  let fixture: ComponentFixture<ChartsMainPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsMainPageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsMainPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
