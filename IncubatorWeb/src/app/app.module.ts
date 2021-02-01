import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
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

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    pathMatch: 'full',
},  
{
    path: 'login',
    component: LoginPageComponent
},
{
  path: 'CompanyDetails',
  component: CompanyDetailsGridComponent
},
{ path: '**', redirectTo: '' }
  // { path: 'home', component: AppComponent },
  // { path: 'login', component: LoginPageComponent },
  // { path: '**', component: AppComponent }
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
    GridModule
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    CompanyDetailsGridComponent,
    SpinnerComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
