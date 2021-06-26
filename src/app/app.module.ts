import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PartenairesComponent } from './partenaires/partenaires.component';
import { FondsComponent } from './fonds/fonds.component';

import { FondsService } from './services/fonds.service';
import { FondsLocalService } from './services/fonds-local.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { ClientService } from './services/client.service';
import { OrdreAchatService } from './services/ordre-achat.service';
import { PortefeuilleService } from './services/portefeuille.service';

import { AuthComponent } from './auth/auth.component';
import { FondsViewComponent } from './fonds-view/fonds-view.component';
import { SingleFondsComponent } from './single-fonds/single-fonds.component';

import { Routes, RouterModule } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { EditFondsComponent } from './edit-fonds/edit-fonds.component';
import { ClientListComponent } from './client-list/client-list.component';
import { NewClientComponent } from './new-client/new-client.component';
import { StockValuesComponent } from './stock-values/stock-values.component'
import { OrdreAchatComponent } from './ordre-achat/ordre-achat.component'

import { ChartsModule } from 'ng2-charts';
import { NewOrdreAchatComponent } from './new-ordre-achat/new-ordre-achat.component';

const appRoutes: Routes = [
  { path: 'fonds', canActivate: [AuthGuard], component: FondsViewComponent },
  { path: 'fonds/:tickerSymbol', canActivate: [AuthGuard], component: SingleFondsComponent },
  { path: 'new-fonds', canActivate: [AuthGuard], component: EditFondsComponent },
  { path: 'clients', canActivate: [AuthGuard], component: ClientListComponent },
  { path: 'clients/ordresAchat/:idClient', canActivate: [AuthGuard], component: OrdreAchatComponent },
  { path: 'new-ordre-achat/:idClient', canActivate: [AuthGuard], component: NewOrdreAchatComponent },
  { path: 'new-client', canActivate: [AuthGuard], component: NewClientComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', canActivate: [AuthGuard], component: AuthComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    PartenairesComponent,
    FondsComponent,
    AuthComponent,
    FondsViewComponent,
    SingleFondsComponent,
    FourOhFourComponent,
    EditFondsComponent,
    ClientListComponent,
    NewClientComponent,
    StockValuesComponent,
    OrdreAchatComponent,
    NewOrdreAchatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FondsService,
    AuthService,
    AuthGuard,
    ClientService,
    FondsLocalService,
    OrdreAchatService,
    PortefeuilleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
