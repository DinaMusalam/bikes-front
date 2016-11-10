import { Component, OnInit } from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  public globalStatistics;

  mockUserId = "a21b56c1-6d28-4ef4-aa9d-1e75f54f61ef";

  constructor(private router:Router,private filterService:FilterService) {
  }

  ngOnInit() {
    this.getGlobalStatistics();
  }

  private getGlobalStatistics(){
    this.filterService.getGlobalStatistics().subscribe(data=>{
      this.globalStatistics = data;
    },error=>console.log('error in getting global statistics',error));
  }

  mock_login(){
    this.router.navigate(['/user',this.mockUserId]);
  }

  mock_login_public(){
    this.router.navigate(['/search']);
  }


}
