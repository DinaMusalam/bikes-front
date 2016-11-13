import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPageComponent} from "./components/search-page/search-page.component";
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthGuardService} from "../services/auth-gurad.service";
import {UserHomeComponent} from "./components/user-home/user-home.component";

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'user/:id',component:UserHomeComponent, canActivate:[AuthGuardService], children:[
    { path: 'profile', component: UserPageComponent},
    {path:'search', component:SearchPageComponent},
  ] },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Ng2BikesRoutingModule { }
