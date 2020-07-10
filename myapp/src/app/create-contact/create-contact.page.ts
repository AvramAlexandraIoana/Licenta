import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../api/user.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Contacts, Contact, ContactName, ContactField } from  '@ionic-native/contacts';
import { ContactDB } from '../_models/ContactDB';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ContactService } from '../api/contact.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.page.html',
  styleUrls: ['./create-contact.page.scss'],
})
export class CreateContactPage implements OnInit {

  isEnterAdress1Input = false;
  isEnterAdress2Input = false;
  contactForm: FormGroup;
  typeView: any;
  user =  new User();
  jwtHelper = new JwtHelperService();


  errorMessages = {
    'name':[
      { type:'required', message: 'Numele contactului este obligatoriu'},
    ],
    'phoneNumber':[
      { type:'required', message: 'Numarul de telefon este obligatoriu'}
    ]
  }
  model: any;
  decodedToken: any;
  language: string;


  constructor(private toastController: ToastController,
    private userService: UserService,
    private route: ActivatedRoute, 
    private navControl: NavController, 
    private formBuilder: FormBuilder,
    private contacts: Contacts,
    private callNumber: CallNumber,
    private sms: SMS,
    private androidPermissions: AndroidPermissions,
    private modalControl: ModalController,
    private contactService: ContactService) { }

  ngOnInit() {  
    this.language == localStorage.getItem("limba");
    this.createContactForm();
  }


  dismiss() {
    this.navControl.navigateBack("tabs/tab4");
   }




 
  createContactForm() {
    this.contactForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'phoneNumber': ['', [ Validators.required]]
    })
  }

  saveContact() {
    if (this.contactForm.invalid) {
      return;
    }
  }


  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }
  createContact() {
    if (this.contactForm.invalid) {
      return;
    }
    this.model = new ContactDB();
    this.model.ContactName = this.contactForm.controls['name'].value;
    this.model.PhoneNumber = this.contactForm.controls['phoneNumber'].value;
    this.model.UserId =  this.getUserId();
    console.log(this.contactForm.controls['phoneNumber'].value);
    // this.contactService.saveContact(this.model).subscribe(res => {
    //   console.log("Contact adaugat!");
    // });

    let contact: Contact = this.contacts.create();
    this.model.PhoneNumber = this.model.PhoneNumber.toString();
    console.log(this.model.PhoneNumber);
    var elem = (this.model.PhoneNumber.split("")).reverse();
    var newElem = '';
    for (var i  = 0; i < elem.length; i++) {
      newElem += elem[i];
    }
    newElem += '0';
    contact.name = new ContactName(null, null, this.model.ContactName);
    contact.phoneNumbers = [ new ContactField("mobile", this.model.PhoneNumber)];

    contact.save().then(
       async () => {
         let toast = await this.toastController.create({
           message: "Contact added!"
         });
         toast.present();
         this.dismiss();

       }, 
       (error: any) => console.log("Error saving contact.", error)
      );
  }


  async presentToast(text, type) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000,
        color: type
      });
    toast.present();
  }




}
