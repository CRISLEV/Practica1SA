import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(protected http: HttpClient) { }

  getContacts() {
    return this.http.get('https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal&filter[search]=200915168');
  }

  newContact(contactName){
    let httpParams = new HttpParams()
    .append("name", contactName);
    var newContactstr = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal'
    console.log(newContactstr);
    return this.http.post(newContactstr, httpParams);
  }

}
