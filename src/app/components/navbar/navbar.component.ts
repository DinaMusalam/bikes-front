import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() user;

  constructor(private router:Router) { }

  ngOnInit() {
  }


  logout(){
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.router.navigate(['']);
  }

}
