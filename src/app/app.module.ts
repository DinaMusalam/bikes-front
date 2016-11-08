import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterialModule} from "@angular/material";
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

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HomePageComponent,
    TableComponent,
    ChartComponent,
    WelcomePageComponent,
    UserPageComponent,
    Chart2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2BikesRoutingModule,
  ],
  providers: [
    FilterService,
    HttpClient,
    CsvService,
    Service,
    PDFService,
    UserService,
    TripService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
