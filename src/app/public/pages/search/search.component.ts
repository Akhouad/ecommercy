import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../../../url.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	keyword: any;
	products: any;
	constructor(private http: HttpClient, private route: ActivatedRoute, private url: UrlService) { }

	ngOnInit() {
	    this.route.params.subscribe(params => {
	      this.keyword = params.keyword
	    });
		this.getProducts()
	}

	getProducts(){
		this.http.get(this.url.apiUrl() + 'api.php?action=search&keyword=' + this.keyword)
			.subscribe(
				res => {
					this.products = res.data
					console.log(res)
				},
				err => {
					console.error(err.errr)
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
