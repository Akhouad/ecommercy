import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../../../url.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  id: any;
  p: any;
  sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private url: UrlService) { }

  methods(){
    $("#picture-frame").zoomToo({
      magnify: 1
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
    });
    this.http.get(this.url.apiUrl() + "api.php?action=product&id=" + this.id)
      .subscribe(data => {
        this.p = data['data'];
        console.log(this.p)
      })
    this.sub = this.route.params.subscribe(params => {
      this.http.get(this.url.apiUrl() + "api.php?action=product&id=" + this.id)
        .subscribe(data => {
          this.p = data['data'];
        })
    });
    this.methods();
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

}
