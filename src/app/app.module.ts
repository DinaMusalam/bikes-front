import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import {Ng2BikesRoutingModule} from "./app-routing.module";
import {FilterService} from "../services/filter.service";
import {CsvService} from "../services/csv.service";
import {Service} from "../services/service";
import {HttpClient} from "../services/http-client.service";
import { HomePageComponent } from './components/home-page/home-page.component';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';
import {PDFService} from "../services/pdf.service";
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import {UserService} from "../services/user.service";
import {TripService} from "../services/trip.service";
import { Chart2Component } from './components/chart2/chart2.component';
import {ConversionService} from '../services/conversion.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {AuthGuardService} from "../services/auth-gurad.service";
import {AUTH_PROVIDERS, provideAuth} from "angular2-jwt/angular2-jwt";
import { UserHomeComponent } from './components/user-home/user-home.component';
import { HeatmapTestComponent } from './components/heatmap-test/heatmap-test.component';
import {MapService} from "../services/map.service";


@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HomePageComponent,
    TableComponent,
    ChartComponent,
    WelcomePageComponent,
    UserPageComponent,
    Chart2Component,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    UserHomeComponent,
    HeatmapTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BikesRoutingModule,
  ],
  providers: [
    FilterService,
    HttpClient,
    CsvService,
    Service,
    PDFService,
    UserService,
    TripService,
    ConversionService,
      MapService,
      AuthGuardService,
      AUTH_PROVIDERS,
      provideAuth({
        tokenName: 'id_token',
        tokenGetter:(() => {
          let token = localStorage.getItem('id_token');
          return token?JSON.parse(token):'';
        })

    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
