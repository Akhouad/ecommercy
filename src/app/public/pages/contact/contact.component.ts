import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UrlService } from '../../../url.service';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name: any;
  email: any;
  message: any;

  constructor(private http: HttpClient, private url: UrlService) { }

  ngOnInit() {
    this.name = "Votre nom"
    this.email = "Votre email"
    this.message = "Votre message"
  }

  sendMessage(e){
    e.preventDefault()
    const headers = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }

    const body = new HttpParams()
      .set('name', this.name)
      .set('email', this.email)
      .set('message', this.message)

    this.http.post(this.url.apiUrl() + 'api.php?action=send-message', body.toString(), headers )
      .subscribe(
        res => {
          console.log(res)
          this.name = ""
          this.email = ""
          this.message = ""
        },
        err => {
          console.error(err.error)
        }
      )
  }

}
