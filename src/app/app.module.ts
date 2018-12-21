import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';


/*Core Components*/
import { 
  AdminLayoutComponent,
  AuthLayoutComponent,
  HeaderComponent,
  SidebarComponent,
  ReportProblemComponent,
  NotFound404Component
} from '@app/core';

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
    ReportProblemComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
