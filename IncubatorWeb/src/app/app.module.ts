import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetryInterceptor } from './Interceptor/RetryInterceptor';
import { TokenInterceptor } from './Interceptor/TokenInterceptor';
import { SpinnerInterceptor } from './Interceptor/SpinnerInterceptor';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsGridComponent } from './CompanyDetails/company-details-grid/company-details-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './Services/Authentication.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AddEditCompanyDetailsComponent } from './CompanyDetails/add-edit-company-details/add-edit-company-details.component';
import { CanActivateGuard } from './Guard/can-activate.guard';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CompanyDetailsGridComponent,
    canActivate: [CanActivateGuard],
    pathMatch: 'full',
  },  
  {
    path: 'CompanyDetails',
    component: CompanyDetailsGridComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'CompanyDetails/AddEdit/:isEdit',
    component: AddEditCompanyDetailsComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'CompanyDetails/AddEdit/:isEdit/:id',
    component: AddEditCompanyDetailsComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule,
    DropDownsModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    CompanyDetailsGridComponent,
    SpinnerComponent,
    AddEditCompanyDetailsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthenticationService,
    CanActivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
