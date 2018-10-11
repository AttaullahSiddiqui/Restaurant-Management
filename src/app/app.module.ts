import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@app/app-routing.module';

import { AppComponent } from '@app/app.component';

/*Core Services Module*/
import { CoreModule } from '@app/core/core.module';
/*Core Components*/
import { AdminLayoutComponent, AuthLayoutComponent, HeaderComponent, SidebarComponent, NotFound404Component } from '@app/core-components';
/*Shared Module */
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    NotFound404Component
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
