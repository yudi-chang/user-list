import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Breadcrumb from '@shared/models/breadcrumb.model';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;
  let location: Location;

  const mockBreadcrumbs: Breadcrumb[] = [
    { label: 'Users', url: '/' },
    { label: 'Middle page', url: '/middle' },
    { label: 'User Detail', url: '' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BreadcrumbsComponent,
        RouterModule.forRoot([
          { path: '', component: BreadcrumbsComponent },
          { path: 'middle', component: BreadcrumbsComponent }
        ])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    component.breadcrumbs = mockBreadcrumbs;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render breadcrumbs correctly when provided as props', () => {
    const breadcrumbItems = fixture.debugElement.queryAll(By.css('[data-test="breadcrumb-item"]'));
    expect(breadcrumbItems.length).toBe(mockBreadcrumbs.length);

    const firstBreadcrumb = breadcrumbItems[0].query(By.css('[data-test="breadcrumb-url"]'));
    const middleBreadcrumb = breadcrumbItems[1].query(By.css('[data-test="breadcrumb-url"]'));
    const lastBreadcrumb = breadcrumbItems[2].query(By.css('[data-test="current-path"]'));

    expect(firstBreadcrumb.nativeElement.textContent.trim()).toBe('Users');
    expect(firstBreadcrumb.attributes['ng-reflect-router-link']).toBe('/');

    expect(middleBreadcrumb.nativeElement.textContent.trim()).toBe('Middle page');
    expect(middleBreadcrumb.attributes['ng-reflect-router-link']).toBe('/middle');

    expect(lastBreadcrumb.nativeElement.textContent.trim()).toBe('User Detail');
    // make sure the last breadcrumb is span (not url)
    expect(lastBreadcrumb.nativeElement.tagName).toBe('SPAN');
  });

  it('should not render breadcrumbs if none are provided', () => {
    component.breadcrumbs = [];
    fixture.detectChanges();

    const breadcrumbItems = fixture.debugElement.queryAll(By.css('[data-test="breadcrumb-item"]'));
    expect(breadcrumbItems.length).toBe(0);
  });

  it('should navigate to the correct URL when a breadcrumb link is clicked', async () => {
    const breadcrumbLinks = fixture.debugElement.queryAll(By.css('[data-test="breadcrumb-url"]'));

    breadcrumbLinks[1].nativeElement.click();

    await fixture.whenStable();
    fixture.detectChanges();
    
    expect(location.path()).toBe('/middle');
  });
});
