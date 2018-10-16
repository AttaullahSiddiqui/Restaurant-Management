import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
                <app-header></app-header>
                <app-sidebar></app-sidebar>
                <section class="main-container">
                  <router-outlet></router-outlet>
                </section>
  `,
})
export class AdminLayoutComponent {

  constructor() { }
}
