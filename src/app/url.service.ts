import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

  constructor() { }

  apiUrl(){
    return 'http://localhost/ecommercy/server/';
  }

}
