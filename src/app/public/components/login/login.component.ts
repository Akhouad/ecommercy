import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	username: any;
	password: any;

	constructor(private http: HttpClient, private url: UrlService, private router: Router) { }

	ngOnInit() {
	}

	login(){
		this.http.get(this.url.apiUrl() + 'api.php?action=get-user&username='+this.username+'&password='+this.password)
			.subscribe(
				res => {
					localStorage.setItem('user', JSON.stringify(res.data))
					this.router.navigate(['/'])
				},
				err => {
					console.error(err.error)
				}
			)
	}

}
