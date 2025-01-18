import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingErrorWrapperComponent } from './loading-error-wrapper.component';
import { StateService } from '@core/services/state.service';
import { of } from 'rxjs';
import { SpinnerComponent } from "../spinner/spinner.component";
import { ErrorHandlerComponent } from "../error-handler/error-handler.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('LoadingErrorWrapperComponent', () => {
  let component: LoadingErrorWrapperComponent;
  let fixture: ComponentFixture<LoadingErrorWrapperComponent>;
  let mockStateService: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    mockStateService = jasmine.createSpyObj('StateService', ['loading$', 'error$']);
    
    mockStateService.loading$ = of(false);
    mockStateService.error$ = of(false);

    await TestBed.configureTestingModule({
      imports: [LoadingErrorWrapperComponent, SpinnerComponent, ErrorHandlerComponent, NgIf, AsyncPipe],
      providers: [
        { provide: StateService, useValue: mockStateService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingErrorWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show content when not loading and no error', () => {
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('[data-test="content-wrapper"]'));
    expect(content).toBeTruthy();
  });

  it('should set correct isLoading props value for SpinnerComponent props', () => {
    const spinnerDebugElement = fixture.debugElement.query(By.directive(SpinnerComponent));
    expect(spinnerDebugElement).toBeTruthy();
  
    const spinnerComponent = spinnerDebugElement.componentInstance as SpinnerComponent;
    expect(spinnerComponent.isLoading).not.toBeTrue();

    mockStateService.loading$ = of(true);
    fixture.detectChanges();
    
    expect(spinnerComponent.isLoading).toBeTrue();
  });

  it('should set correct isError props value for ErrorHandlerComponent props', () => {
    const errorHandlerDebugElement = fixture.debugElement.query(By.directive(ErrorHandlerComponent));
    expect(errorHandlerDebugElement).toBeTruthy();
  
    const errorHandlerComponent = errorHandlerDebugElement.componentInstance as ErrorHandlerComponent;
    expect(errorHandlerComponent.isError).not.toBeTrue();

    mockStateService.error$ = of(true);
    fixture.detectChanges();

    expect(errorHandlerComponent.isError).toBeTrue();
  });

  it('should call retry function on error handler when provided', () => {
    const retrySpy = jasmine.createSpy('retry');
    component.retry = retrySpy;

    mockStateService.error$ = of(true);
    fixture.detectChanges();

    const errorHandler = fixture.debugElement.query(By.directive(ErrorHandlerComponent)).componentInstance;

    errorHandler.retry();

    expect(retrySpy).toHaveBeenCalled();
  });
});
