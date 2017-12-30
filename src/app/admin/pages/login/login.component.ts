import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(e){
    e.preventDefault()
    this.auth.login(this.username, this.password)
  }

}
