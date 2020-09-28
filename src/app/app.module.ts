import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DefaultUrlSerializer, UrlTree, UrlSerializer } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TimbreListComponent } from './components/timbre-list/timbre-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { ToastComponent } from './components/toast/toast.component';
import { ArrowToTopComponent } from './components/arrow-to-top/arrow-to-top.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketComponent } from './components/basket/basket.component';
import { SidebarModule } from 'primeng/sidebar';
import { DevisConfirmationComponent } from './components/devis-confirmation/devis-confirmation.component';
import { DropdownModule } from 'primeng/dropdown';
import { LoadingComponent } from './components/loading/loading.component';
import { MerciComponent } from './components/merci/merci.component';






export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    // Optional Step: Do some stuff with the url if needed.

    // If you lower it in the optional step
    // you don't need to use "toLowerCase"
    // when you pass it down to the next function
    return super.parse(url.toLowerCase());
  }
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TimbreListComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    AdminPanelComponent,
    AdminRegisterComponent,
    FourOFourComponent,
    ToastComponent,
    ArrowToTopComponent,
    BasketComponent,
    DevisConfirmationComponent,
    LoadingComponent,
    MerciComponent],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        }
      }
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    SidebarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule

  ],
  providers: [{
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
