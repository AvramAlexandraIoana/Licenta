import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  decodedToken: any;
  jwtHelper = new JwtHelperService();
  userId: number;
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  imageURL: any;
  desc: string;
  busy: boolean;
  noFace: boolean;
  constructor( private storage: AngularFireStorage, private http: HttpClient) { }

  ngOnInit() {
    this.userId = this.getUserId();
  }

  createPost() {
    const image = this.imageURL;
    const desc = this.desc;
    const model = {
      "id": this.userId,
      "url": this.imageURL
    }
    this.http.post("https://192.168.43.212:5001/api/users/postImagePath", model)
      .subscribe(res => {
        console.log(res);
      });
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }



  fileChanged(event) {
    this.busy = true;
    const files = event.target.files;
    console.log(files);

    const data = new FormData();
    data.append("file", files[0]);
    data.append("UPLOADCARE_STORE", "1");
    data.append("UPLOADCARE_PUB_KEY", "90c1d8d2d64899fd64ee");


    this.http.post("https://upload.uploadcare.com/base/", data)
      .subscribe(event => {
        console.log(event);
        console.log(event)
        //this.imageURL = event.file
        this.busy = false
        this.http.get(`https://ucarecdn.com/${this.imageURL}/detect_faces/`)
        .subscribe(event => {
         // this.noFace = event.faces == 0
        })
      })
  }

  // onFileSelected(event) {
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }

}
