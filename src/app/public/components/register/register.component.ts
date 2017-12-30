import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	password: any;
	username: any;
	constructor(private http: HttpClient, private url: UrlService) { }

	ngOnInit() {
	}

	register(){
		this.http.get(this.url.apiUrl() + 'api.php?action=add-user&username=' + this.username + '&password=' + this.password + '&level=user')
			.subscribe(
				res => {
					localStorage.setItem('user', JSON.stringify(res.data))
				},
				err => {
					console.error(err.error)
				}
			)
	}

}
