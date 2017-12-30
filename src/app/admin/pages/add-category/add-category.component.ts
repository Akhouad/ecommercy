import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
	title: any;

	constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
	}

	add(){
		this.http.get(this.url.apiUrl() + 'api.php?action=add-category&title=' + this.title)
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
