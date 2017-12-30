import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	categories: any;
	marques: any;


  constructor(private http: HttpClient, private url: UrlService, private router: Router) { }

  ngOnInit() {
  	this.getCategories()
  	this.getMarques()
  }

  getCategories(){
  	this.http.get(this.url.apiUrl() + 'api.php?action=categories')
  		.subscribe(
  			res => {
  				this.categories = res.data
  			},
  			err => {

  			}
  		)
  }

  getMarques(){
  	this.http.get(this.url.apiUrl() + 'api.php?action=marques')
  		.subscribe(
  			res => {
  				this.marques = res.data
  			},
  			err => {

  			}
  		)
  }

  logout(e){
    e.preventDefault()
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }

  userActive(){
    return localStorage.getItem('user') !== null
  }

}
