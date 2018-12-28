import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*Shared*/
import { SharedModule } from '@app/shared';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    PublicRoutingModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class PublicModule { }
