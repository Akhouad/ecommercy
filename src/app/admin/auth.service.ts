import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  constructor(private url: UrlService, private http: Http, private router: Router) { }

  login(username_: String, password_: String){
    //let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'});
    let headers = new Headers({'Content-Type': 'application/json; charset=UTF-8;'});
    let options = new RequestOptions({headers: headers});
    let user = JSON.stringify({'username': username_, 'password': password_})
 
    this.http.get(this.url.apiUrl() + "api.php?username=" + username_ + "&password=" + password_)
      .subscribe(
        res => {
          let d = JSON.parse(res['_body'])
          if(d.data !== false && d.data.USER_LEVEL == 'admin'){
            localStorage.setItem('admin', JSON.stringify(d))
            this.router.navigate(['/admin'])
          }else{
            console.log('error')
          }
        },
        err => {
          console.error(JSON.stringify(err.error))
        }
      )
  }

  logout(){
    localStorage.removeItem('admin')
    this.router.navigate(['/admin/login'])
  }

  isAuthenticated(){
    return localStorage.getItem('admin') !== null
  }

}
