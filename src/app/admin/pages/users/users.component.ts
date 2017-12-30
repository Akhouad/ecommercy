import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	users: any;
	username: string;
	password: string;
	userLevel: string;

	constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
		this.getUsers()
	}

	getUsers(){
		this.http.get(this.url.apiUrl() + 'api.php?action=getusers')
			.subscribe(
				res => {
					this.users = res.data
				},
				err => {
					console.log(err.error)
				}
			)
	}
	
	delete(id){
		this.http.get(this.url.apiUrl() + 'api.php?action=delete-user&id=' + id)
			.subscribe(
				res => {
					console.log(res)
					this.getUsers()
				},
				err => {
					console.error(err.error)
					this.getUsers()
				}
			)
	}

	add(){
		this.http.get(this.url.apiUrl() + 'api.php?action=add-user&username=' + this.username + '&password=' + this.password + '&level=' + this.userLevel)
			.subscribe(
				res => {
					console.log(res)
					this.getUsers()
					this.username = ""
					this.password = ""
					this.userLevel = ""
				},
				err => {
					console.error(err.error)
				}
			)
	}
}
