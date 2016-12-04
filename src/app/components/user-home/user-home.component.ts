import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  //userInfo is representing profile for now. because user profile is empty.
  userInfo2={
    fullName:"John Mc.Power",
    email:"john@domain.com",
    avatar:"../../../assets/cat.png",
    bio:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolorem ducimus earum excepturi exercitationem illo impedit ipsa iusto, non perferendis porro quaerat quas quasi quibusdam repudiandae rerum veritatis voluptas voluptates?",
    height:182,
    weight:90,
    age:32,
    sex:'male'
  };
  profile;

  constructor(private router:Router) { }

  ngOnInit() {
  }


}
