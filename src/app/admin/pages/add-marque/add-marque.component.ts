import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.scss']
})
export class AddMarqueComponent implements OnInit {
	title: any;
	 constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
	}

  	add(){
		this.http.get(this.url.apiUrl() + 'api.php?action=add-marque&title=' + this.title)
			.subscribe(
				res => {
					console.log(res)
				},
				err => {
					console.log(err.error)
				}
			)
	}

}
