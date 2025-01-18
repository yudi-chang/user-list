import { Component, Input } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { StateService } from '@core/services/state.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { ErrorHandlerComponent } from "../error-handler/error-handler.component";

@Component({
  selector: 'app-loading-error-wrapper',
  standalone: true,
  imports: [NgIf, AsyncPipe, SpinnerComponent, ErrorHandlerComponent],
  templateUrl: './loading-error-wrapper.component.html',
  styleUrl: './loading-error-wrapper.component.scss'
})
export class LoadingErrorWrapperComponent {
  @Input() retry!: () => void;

  constructor(
    public state: StateService
  ) {}
}
