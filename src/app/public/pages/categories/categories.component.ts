import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	products: any;
	category: any;
	id: any;

	constructor(private http: HttpClient, private url: UrlService, private route: ActivatedRoute) { }

	ngOnInit() {
	    this.route.params.subscribe(params => {
	      this.id = params.id
	    });
		this.getCategory()
	    this.getProducts()



	    this.sub = this.route.params.subscribe(params => {
	      this.getCategory()
	      this.getProducts()
	    });
	}

	getProducts(){
		this.http.get(this.url.apiUrl() + "api.php?action=products&catid=" + this.id)
		  .subscribe(d => {
		    console.log(d.data)
		    this.products = d['data'];
		  })
	}

	getCategory(){
		this.http.get(this.url.apiUrl() + 'api.php?action=category&id=' + this.id)
			.subscribe(
				res => {
					console.log(res.data)
					this.category = res.data
				},
				err => {
					console.error(err.error)
				}
			)
	}	

  addToCart(e){
    console.log(e)
    let cart = [];
    if(localStorage.getItem('cart') !== null){
      let items = localStorage.getItem('cart')
      cart = JSON.parse(items)
      cart.push(e.srcElement.dataset)
      localStorage.removeItem('cart')
    }else{
      cart[0] = e.srcElement.dataset
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  replaceLineBreak(s:string) {
    return s.toLocaleLowerCase().split(' ').join('-')
  }

}
