import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ErrorHandlerComponent } from './error-handler.component';

describe('ErrorHandlerComponent', () => {
  let component: ErrorHandlerComponent;
  let fixture: ComponentFixture<ErrorHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandlerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render error handler wrapper when isError is true', () => {
    component.isError = true;
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('[data-test="error-handler-wrapper"]'));
    expect(wrapper).toBeTruthy();
  });

  it('should not render error handler wrapper when isError is false', () => {
    component.isError = false;
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('[data-test="error-handler-wrapper"]'));
    expect(wrapper).toBeNull();
  });

  // in Jest, I usually just use .toMatchSnapshot() for this kind of test (making sure the rendered output is correct)
  // I saw that jasmine doesn't really have a built-in snapshot feature
  // Though there is a jasmine snapshot plugin, but I'm not sure if it's a good practice to use it
  // https://github.com/horvay/jasmine-snapshot
  it('should display the correct error message when isError is true', () => {
    component.isError = true;
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(message.textContent.trim()).toBe('An unexpected error has occured. please try again or contact support if the error persists');
  });

  it('should call the retry function when the retry button is clicked', () => {
    const retrySpy = jasmine.createSpy('retry');
    component.retry = retrySpy;
    component.isError = true;
    fixture.detectChanges();

    const retryButton = fixture.debugElement.query(By.css('[data-test="retry-btn"]')).nativeElement;
    retryButton.click();

    expect(retrySpy).toHaveBeenCalledTimes(1);
  });
});
