import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController } from '@ionic/angular';
import { Contacts, Contact, ContactName, ContactField } from  '@ionic-native/contacts';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.page.html',
  styleUrls: ['./contact-management.page.scss'],
})
export class ContactManagementPage implements OnInit {
  myContacts: Contact[] =[];

  constructor(private contacts: Contacts,
            private callNumber: CallNumber,
            private sms: SMS,
            public toastController: ToastController,
            private androidPermissions: AndroidPermissions) { 

            }

  ngOnInit() {
  }

  
  loadContacts() {
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    };

    this.contacts.find(['*'], options).then((contacts: Contact[]) => {
      this.myContacts = contacts;
      console.log("Contacts:", this.myContacts);
   
    });
  }

 

checkSMSPermission() {
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
    result => console.log('Has permission?', result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
  );
}
requestSMSPermission() {
  // tslint:disable-next-line: max-line-length
  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.BROADCAST_SMS]);
}

  sendSms(contact: Contact) {
    this.checkSMSPermission();
    this.requestSMSPermission();
    this.checkSMSPermission();

     // CONFIGURATION
    const options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
          intent: ''  // send SMS with the native android SMS messaging
          // intent: '' // send SMS without opening any other app
      }
    };
    this.sms.send(contact.phoneNumbers[0].value, "text", options).then(() => {
      console.log('Success', 'message has been sent');
      this.presentToast("Mesaj trimis", "success");
    })
    .catch(error => {
      this.presentToast(error, "warning");
    });
  }


  call(contact: Contact) {
    this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
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

  createContact() {
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, "Albus", "Ape");
    contact.phoneNumbers = [ new ContactField("mobile", "123445678")];

    contact.save().then(
       async () => {
         let toast = await this.toastController.create({
           message: "Contact added!"
         });
         toast.present();

       }, 
       (error: any) => console.log("Error saving contact.", error)
      );
  }

}
