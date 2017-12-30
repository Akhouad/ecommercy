import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
	messages: any;
	constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
		this.getMessages();
	}

 	getMessages(){
		this.http.get(this.url.apiUrl() + 'api.php?action=messages')
			.subscribe(
				res => {
					this.messages = res.data
				},
				err => {
					console.log(err.error)
				}
			)
	}

	delete(id){
		this.http.get(this.url.apiUrl() + 'api.php?action=delete-message&id=' + id)
			.subscribe(
				res => {
					this.getMessages()
				},
				err => {
					console.log(err.error)
					this.getMessages()
				}
			)
	}
}
