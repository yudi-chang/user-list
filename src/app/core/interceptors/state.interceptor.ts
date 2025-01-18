import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from '@core/services/state.service';
import { catchError, finalize, throwError } from 'rxjs';

let totalRequests = 0;

export const stateInterceptor: HttpInterceptorFn = (req, next) => {
  const stateService = inject(StateService);
  totalRequests++;

  stateService.setLoading(true);
  stateService.setError(false);

  // since loading is only used for fetching, and all api is fetching / GET (list + detail), no need to check for the http request url (e.g which api not needed to set loading)
  // if in the future need another loading state for example for update / delete data (usually loading in button), can separate the state from only 1 state loading to isFetching and isUpdating
  // isFetching will be used for the spinner component when fetching data, and isUpdating can be used for some small loading like inside a button, or disabling form input when submitting
  // for now 1 state loading and no url checking are enough

  return next(req).pipe(
    catchError((error) => {
      stateService.setError(true);
      return throwError(() => new Error(error)); 
    }),
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        stateService.setLoading(false);
      }
    })
  );
};