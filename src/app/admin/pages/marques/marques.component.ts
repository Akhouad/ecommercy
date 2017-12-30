import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.scss']
})
export class MarquesComponent implements OnInit {
	marques: any;
	constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
		this.getMarques();
	}

 	getMarques(){
		this.http.get(this.url.apiUrl() + 'api.php?action=marques')
			.subscribe(
				res => {
					this.marques = res.data
				},
				err => {
					console.log(err.error)
				}
			)
	}

	delete(id){
		this.http.get(this.url.apiUrl() + 'api.php?action=delete-marque&id=' + id)
			.subscribe(
				res => {
					this.getMarques()
				},
				err => {
					console.log(err.error)
					this.getMarques()
				}
			)
	}

}
