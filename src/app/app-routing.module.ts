import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TimbreListComponent } from './components/timbre-list/timbre-list.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'timbres', component: TimbreListComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'adminpanel', canActivate: [AuthGuard], component: AdminPanelComponent },
  { path: 'register', component: AdminRegisterComponent }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
