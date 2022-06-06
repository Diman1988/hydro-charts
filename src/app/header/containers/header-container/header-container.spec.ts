import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContainerComponent } from './header-container';

describe('HeaderContainerComponent', () => {
  let component: HeaderContainerComponent;
  let fixture: ComponentFixture<HeaderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
