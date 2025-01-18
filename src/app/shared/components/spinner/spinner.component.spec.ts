import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const spinnerWrapper = fixture.debugElement.query(By.css('[data-test="loader-wrapper"]'));
    expect(spinnerWrapper).toBeTruthy();
  });

  it('should not render the spinner when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const spinnerWrapper = fixture.debugElement.query(By.css('[data-test="loader-wrapper"]'));
    expect(spinnerWrapper).toBeNull();
  });
});
