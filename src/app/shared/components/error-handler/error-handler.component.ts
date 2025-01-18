import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error-handler',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss'
})
export class ErrorHandlerComponent {
  @Input() isError: boolean = false;
  // this passing retry function props is props drilling (from main component (list users / user detail) to loading-error-wrapper to this component)
  // in a complex project (can be scalled up), better use NgRx or other state management library so it can be called directly from store, instead of doing props drilling
  // since this project is simple, I opt to use props drilling to keep it simple
  @Input() retry: () => void = () => {};
}
