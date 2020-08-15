import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(protected http: HttpClient) { }

  getContacts() {
    var auth = window.btoa("sa:usac");
    let callheaders: HttpHeaders = new HttpHeaders();
    callheaders = callheaders.append('Authorization', 'Basic ' + auth);
    callheaders = callheaders.append('Content-Type', 'application/xml');

    let bodyXml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:adm="https://api.softwareavanzado.world/media/redcore/webservices/joomla/administrator.contact.1.0.0.wsdl">'+
                '  <soap:Header/>'+
                '  <soap:Body>'+
                '      <adm:readList>'+
                '        <filterSearch>200915168</filterSearch>'+
                '      </adm:readList>'+
                '  </soap:Body>'+
                '</soap:Envelope>';
    let url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap';
    return this.http.post(url, bodyXml, {responseType: 'text',  headers: callheaders});
  }

  newContact(contactName){
    var auth = window.btoa("sa:usac");
    let callheaders: HttpHeaders = new HttpHeaders();
    callheaders = callheaders.append('Authorization', 'Basic ' + auth);
    callheaders = callheaders.append('Content-Type', 'application/xml');

    let bodyXml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:adm="https://api.softwareavanzado.world/media/redcore/webservices/joomla/administrator.contact.1.0.0.wsdl">'+
                  '    <soap:Header/>'+
                  '    <soap:Body>'+
                  '      <adm:create>'+
                  '          <name>'+contactName+'</name>'+
                  '      </adm:create>'+
                  '    </soap:Body>'+
                  '</soap:Envelope>';
    let url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap';
    return this.http.post(url, bodyXml, {responseType: 'text',  headers: callheaders});
  }

}
