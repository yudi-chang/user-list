import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('should set loading correctly', fakeAsync(() => {
    const loadingNewStatus = true;
    let currentLoading: boolean | undefined;

    service.loading$.subscribe((status) => {
      currentLoading = status;
    });

    service.setLoading(loadingNewStatus);
    tick();

    expect(currentLoading).toBe(loadingNewStatus);
  }));

  it('should set error correctly', fakeAsync(() => {
    const errorNewStatus = true;
    let currentError: boolean | undefined;

    service.error$.subscribe((status) => {
      currentError = status;
    });

    service.setError(errorNewStatus);
    tick();

    expect(currentError).toBe(errorNewStatus);
  }));
});
