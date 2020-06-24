import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CountriesComponent } from './components/countries/countries.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

// const MyGoogleChartsSettings: GoogleChartsSettings = {
//   mapsApiKey: 'YOUR_API_KEY',
//   googleChartsVersion: '46',
//   language: 'it',
// };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CountriesComponent,
    DashboardCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule
  ],
  providers: [
    // {
    //   provide: 'googleChartsSettings',
    //   useValue: MyGoogleChartsSettings,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
