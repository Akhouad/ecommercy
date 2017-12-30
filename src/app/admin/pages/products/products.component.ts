import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
	products: any;
	categories: any;
	marques: any;

	constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
		this.getProducts()
	}

	getProducts(){
		this.http.get(this.url.apiUrl() + 'api.php?action=all-products')
			.subscribe(
				res => {
					this.products = res.data
					console.log(this.products)
				},
				err => {
					console.log(err.error)
				}
			)
	}

	delete(id){
		this.http.get(this.url.apiUrl() + 'api.php?action=delete-product&id=' + id)
			.subscribe(
				res => {
					console.log(res.data)
					this.getProducts()
				},
				err => {
					console.error(err.error)
					this.getProducts()
				}
			)
	}

}
