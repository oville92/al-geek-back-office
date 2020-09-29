import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthorizationService } from '../api/authorization.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _auth:AuthorizationService, 
              private _router: Router) { }

  logOut(){
    this._auth.logOut();
    this._router.navigateByUrl('login');
  }

  ngOnInit(): void {
  }

}
