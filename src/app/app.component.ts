import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'practica1sa';
  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;
  contacts: any[] = [];
  contactName:any ;

  constructor(
    protected contactService: ContactsService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.lstContacts();
  }

  refresh() {
    console.log("refreshing...");
    this.dataSource = [...this.dataSource];
    this.changeDetectorRefs.detectChanges();
  }

  lstContacts(){
    this.contactService.getContacts()
    .subscribe(
      (data) => {
        this.contacts = data['_embedded'];
        this.contacts = this.contacts['item'];
        ELEMENT_DATA = [];
        for (let i = 0; i < this.contacts.length; i++) {
          //console.log(this.contacts[i].name);
          ELEMENT_DATA.push({position: (i+1), name: this.contacts[i].name});
        }
        this.dataSource = ELEMENT_DATA;
        console.log(this.dataSource);
        this.refresh();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  actionBtn(){
    console.log(this.contactName);
    var response = this.contactService.newContact(this.contactName)
    .subscribe(
      data => {// Success
        console.log(data);
        alert('Contacto creado!');
        this.lstContacts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}

export interface ContactElement {
  name: string;
  position: number;
}

var ELEMENT_DATA: ContactElement[] = [
];
