import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.scss']
})
export class MarquesComponent implements OnInit {

 	products: any;
	marque: any;
	id: any;

	constructor(private http: HttpClient, private url: UrlService, private route: ActivatedRoute) { }

	ngOnInit() {
	    this.route.params.subscribe(params => {
	      this.id = params.id
	    });
		this.getMarque()
	    this.getProducts()



	    this.sub = this.route.params.subscribe(params => {
	      this.getMarque()
	      this.getProducts()
	    });
	}

	getProducts(){
		this.http.get(this.url.apiUrl() + "api.php?action=products&marqueid=" + this.id)
		  .subscribe(d => {
		    console.log(d.data)
		    this.products = d['data'];
		  })
	}

	getMarque(){
		this.http.get(this.url.apiUrl() + 'api.php?action=marque&id=' + this.id)
			.subscribe(
				res => {
					console.log(res.data)
					this.marque = res.data
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
