import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	categories: any;
	constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
		this.getCategories()
	}

	getCategories(){
		this.http.get(this.url.apiUrl() + 'api.php?action=categories')
			.subscribe(
				res => {
					this.categories = res.data
				},
				err => {
					console.log(err.error)
				}
			)
	}

	delete(id){
		this.http.get(this.url.apiUrl() + 'api.php?action=delete-category&id=' + id)
			.subscribe(
				res => {
					this.getCategories()
				},
				err => {
					console.log(err.error)
					this.getCategories()
				}
			)
	}

}
