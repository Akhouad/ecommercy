import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  	commandes: any;
	constructor(private url: UrlService, private http: HttpClient) { }

	ngOnInit() {
		this.getCommandes();
	}

 	getCommandes(){
		this.http.get(this.url.apiUrl() + 'api.php?action=commandes')
			.subscribe(
				res => {
					this.commandes = res.data
				},
				err => {
					console.log(err.error)
				}
			)
	}

	delete(id){
		this.http.get(this.url.apiUrl() + 'api.php?action=delete-commande&id=' + id)
			.subscribe(
				res => {
					this.getCommandes()
				},
				err => {
					console.log(err.error)
					this.getCommandes()
				}
			)
	}

	valider(id){
		this.http.get(this.url.apiUrl() + 'api.php?action=validate-commande&id=' + id)
			.subscribe(
				res => {
					this.getCommandes()
				},
				err => {
					console.log(err.error)
					this.getCommandes()
				}
			)
	}

}
