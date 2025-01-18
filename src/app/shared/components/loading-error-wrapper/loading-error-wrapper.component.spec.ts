import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingErrorWrapperComponent } from './loading-error-wrapper.component';

describe('LoadingErrorWrapperComponent', () => {
  let component: LoadingErrorWrapperComponent;
  let fixture: ComponentFixture<LoadingErrorWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingErrorWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingErrorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
