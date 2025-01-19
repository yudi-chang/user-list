import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import Breadcrumb from '@shared/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
}
