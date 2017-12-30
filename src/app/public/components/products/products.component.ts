import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProductsComponent implements OnInit {

  products: any;

  constructor(private http: HttpClient, private url: UrlService) { }

  ngOnInit() {
    this.http.get(this.url.apiUrl() + "api.php?action=products")
      .subscribe(d => {
        console.log(d.data)
        this.products = d['data'];
      })
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
