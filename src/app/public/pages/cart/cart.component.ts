import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';
import { Router } from '@angular/router';

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: any;
  total: any = 0;

  button: any;
  active: any;

  constructor(private http: HttpClient, private url: UrlService, private router: Router) { }

  getItems(){
    if(localStorage.getItem('cart') !== null){
      this.cart = JSON.parse(localStorage.getItem('cart'))
      console.log(this.cart)
      this.sum()
    }
  }

  sum(){
    this.total = 0
    this.cart.forEach(e => {
      this.total += e.price * e.quantity
    });
  }

  plus(id){
    let qty = parseInt(this.cart[id].quantity);
    this.cart[id].quantity = (qty+1).toString();
    localStorage.removeItem('cart')
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.sum()
  }
  
  minus(id){
    let qty = parseInt(this.cart[id].quantity);
    if(qty > 0){
      this.cart[id].quantity = (qty-1).toString();
      localStorage.removeItem('cart')
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.sum()
    }
  }

  removeItem(id){
    this.cart.splice(id, 1)
    localStorage.removeItem('cart')
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.getItems()
    this.sum()
  }
  
  replaceLineBreak(s:string) {
    return s.toLocaleLowerCase().split(' ').join('-')
  }

  ngOnInit() {
    this.getItems()
    
    if(localStorage.getItem('user') === null){
      this.button = 'Connectez-vous s.v.p.'
      this.active = 'disabled';
    }else{
      this.button = 'Paiement'
      this.active = ''
    }

    $(document).ready(function(c) {
      $('.close1').on('click', function(c){
        $('.cross').fadeOut('slow', function(c){
          $('.cross').remove();
        });
      });	  
    });

    $(document).ready(function(c) {
      $('.close2').on('click', function(c){
        $('.cross1').fadeOut('slow', function(c){
          $('.cross1').remove();
        });
      });	  
    });

    $(document).ready(function(c) {
      $('.close3').on('click', function(c){
        $('.cross2').fadeOut('slow', function(c){
          $('.cross2').remove();
        });
      });	  
    });
  }

  pay(e){
    e.preventDefault()
    let id = JSON.parse(localStorage.getItem('user')).ID
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)
    
    this.http.get(this.url.apiUrl() + 'api.php?action=cart&id=' + id)
      .subscribe(
        res => {
          let id = res.data

          cart.forEach(elem => {
            this.http.get(this.url.apiUrl() + 'api.php?action=cart-products&productid='+elem.id+'&cartid='+id+'&qty='+elem.quantity)
              .subscribe(
                res => {
                  console.log(res.data)
                  localStorage.removeItem('cart')
                },
                err => {
                  console.error(err.error)
                }
              )
          })
        },
        err => {
          console.error(err.error)
        }
      )
  }
}
