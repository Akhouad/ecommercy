import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../url.service';

@Component({
  selector: 'app-other-products',
  templateUrl: './other-products.component.html',
  styleUrls: ['./other-products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OtherProductsComponent implements OnInit {
  
  products: any;

  constructor(private http: HttpClient, private url: UrlService) { }

  ngOnInit() {
    this.http.get(this.url.apiUrl() + "api.php?action=products")
      .subscribe(data => {
        this.products = data['data'];
      })
  }
  
    replaceLineBreak(s:string) {
      return s.toLocaleLowerCase().split(' ').join('-')
    }

}
