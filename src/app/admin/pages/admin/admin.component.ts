import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  title: any;
  constructor() { 
    $(document).ready(function() {
  		$('.button-collapse').sideNav();
      $('.collapsible').collapsible();
      $('select').material_select();
  	});
  }

  ngOnInit() {
  }

}
