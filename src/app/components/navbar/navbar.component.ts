import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
