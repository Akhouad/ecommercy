import { Component, OnInit, NgZone, ViewEncapsulation  } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  marques: any;
  categories: any;

  showLoader = false;
  filename: any;

  selectChanged(e){
    e.preventDefault()
    this.showLoader = true;
    this.filename = e.target.files[0].name

    let lastID
    this.http.get(this.url.apiUrl() + 'api.php?action=last-product')
      .subscribe(
        res => {
          lastID = res.data.ID

          let data = new FormData()
          data.append('file', e.target.files[0])
          data.append('id', lastID)

          this.http.post(this.url.apiUrl() + 'upload.php', data)
            .subscribe(
              res => {
                this.addImage()
                this.showLoader = false;
              },
              err => {
                this.addImage()
                this.showLoader = false;
              }
            )
        }
      )
    
    return false
  }

  constructor(private url: UrlService, private http: HttpClient) { }

  ngOnInit() {
    this.getMarques()
    this.getCategories()
    //$("#addimagemodal").modal()
  }

  getMarques(){
    this.http.get(this.url.apiUrl() + 'api.php?action=marques')
      .subscribe(
        res => {
          this.marques = res.data
          let html = "";
          this.marques.forEach((element) => {
            html += "<option value='" + element.ID + "'>" + element.TITLE + "</option>"
          })
          $("#marque").append(html)
          $("#marque").material_select()
          this.marque = this.marques[0].ID
        },
        err => {
          console.log(err.error)
        }
      )
  }

  getCategories(){
    this.http.get(this.url.apiUrl() + 'api.php?action=categories')
      .subscribe(
        res => {
          this.categories = res.data
          let html = "";
          this.categories.forEach((element) => {
            html += "<option value='" + element.ID + "'>" + element.TITLE + "</option>"
          })
          $("#category").append(html)
          $("#category").material_select()
          this.category = this.categories[0].ID
        },
        err => {
          console.log(err.error)
        }
      )
  }

  add(){
    const headers = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }

    const body = new HttpParams()
      .set('title', this.title)
      .set('price', this.price)
      .set('oldprice', this.oldprice)
      .set('description', this.description)
      .set('cat', $("#category").val())
      .set('marque', $("#marque").val())

    this.http.post(this.url.apiUrl() + 'api.php?action=add-product', body.toString(), headers )
      .subscribe(
        res => {
          console.log(res)
          $('#addimagemodal').modal();
        },
        err => {
          console.error(err.error)
        }
      )
  }

  getLastId(){
    this.http.get(this.url.apiUrl() + 'api.php?action=last-product')
      .subscribe(
        res => {
          return res.data.ID
        },
        err => {
          console.error(err.error)
        }
      )
  }

  addImage(){
    this.http.get(this.url.apiUrl() + 'api.php?action=last-product')
      .subscribe(
        res => {
          const headers = {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          }

          const body = new HttpParams()
            .set('id', res.data.ID)
            .set('path', this.filename)

          this.http.post(this.url.apiUrl() + 'api.php?action=add-image', body.toString(), headers )
            .subscribe(
              res => {
                console.log(res)
              },
              err => {
                console.error(err.error)
              }
            )
        },
        err => {
          console.error(err.error)
        }
      )
    
    }

}
