import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TimbreListComponent } from './components/timbre-list/timbre-list.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DevisConfirmationComponent } from './components/devis-confirmation/devis-confirmation.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { MerciComponent } from './components/merci/merci.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'timbres', component: TimbreListComponent, runGuardsAndResolvers: 'always' },
  { path: 'admin', component: LoginComponent },
  { path: 'adminpanel', canActivate: [AuthGuard], component: AdminPanelComponent },
  { path: 'commande', component: DevisConfirmationComponent },
  { path: 'merci', component: MerciComponent },
  { path: '%23', redirectTo: '', pathMatch: 'full' },
  { path: '#', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: FourOFourComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
