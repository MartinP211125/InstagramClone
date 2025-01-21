import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';

@Component({
  selector: 'app-page-not-found-error',
  templateUrl: './page-not-found-error.component.html',
  styleUrls: ['./page-not-found-error.component.css'],
  standalone: false
})
export class PageNotFoundErrorComponent {

  constructor(private route: Router) { }

  goToHomePage() {
    this.route.navigate(['/home']);
  }
}
