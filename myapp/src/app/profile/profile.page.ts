import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, Platform, LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../api/auth.service';
import { UserService } from '../api/user.service';
import { ProfileImage } from '../_models/ProfileImage';
const STORAGE_KEY = 'my_images';
import * as _ from 'lodash';
import { User } from '../_models/User';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import { ImageHistoryService } from '../api/image-history.service';
import { FaceObject } from '../_models/FaceObject';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  decodedToken: any;
  jwtHelper = new JwtHelperService();
  userId: number;
  user = new User();
  downloadURL: any;
  photo: any;
  fb;
  pictureUrl: string;
  isFirstLoad: boolean;
  imageToShow: string | ArrayBuffer;
  isImageLoading: boolean;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  image: any;
  images: [];
  imageURL: string;
  typeView: string;
  isInit: boolean = false;
  noFace: boolean;
  language: string;

 
  constructor(private sanitizer: DomSanitizer, private st: AngularFireStorage, private userService: UserService, private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private platform: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private filePath: FilePath,
    public navControl: NavController,
    private imageHistoryService: ImageHistoryService,
    private alertController: AlertController,
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage) { }
 

  ionViewWillEnter(){

    if (!this.isInit) {
      this.getImageName(this.userId);
    } else {
      this.isInit = false;
    }
    console.log("view");
  }
  ngOnInit() {
    this.isInit = true;
    this.language = localStorage.getItem("limba");
    this.userId = this.getUserId();
    this.getImageName(this.userId);

  }

  getImage(userId: number): Observable<Blob> {
    return this.http.get('https://192.168.43.212:5001/api/users/getImageProfile/' + userId , {responseType: "blob"});
}
 
  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getImageName(userId: number) {
    this.userService.getUser(userId).subscribe(response => {
      this.user = response;
      // this.profileImage.name = response.profilePictureName;
      this.imageURL = response.profilePictureName;
      this.isFirstLoad = true;
      console.log(response);
     
    })
  }

 
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
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

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }
 
  takePicture(sourceType: PictureSourceType) {
      var options: CameraOptions = {
          // quality: 100,
          allowEdit:true,
          targetWidth: 500,
          targetHeight: 500,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
      };
  
      this.camera.getPicture(options).then(imagePath => {
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(imagePath)
                  .then(filePath => {
                      let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                      let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                  });
          } else {
              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
      });
  
  }

 
  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
    }, error => {
        this.presentToast('Error while storing file.', "warning");
    });
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        if (!arr) {
            let newImages = [name];
            this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
        } else {
            arr.push(name);
            this.storage.set(STORAGE_KEY, JSON.stringify(arr));
        }

        let filePath = this.file.dataDirectory + name;
        let resPath = this.pathForImage(filePath);

        let newEntry = {
            name: name,
            path: resPath,
            filePath: filePath,
            userId: this.userId
        };
        console.log(newEntry);

        // this.images = [newEntry, ...this.images];
        this.startUpload(newEntry)
        this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  startUpload(imgEntry) {
    this.isFirstLoad = false;
    this.pictureUrl = imgEntry.path;
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
        .then(entry => {
       ( < FileEntry > <unknown>entry).file(file => this.readFile(file))
        })
        .catch(err => {
            this.presentToast('Error while reading file.', "warning");
        });
  }

  readFile(file: any) {
    console.log(file);
    
    const reader = new FileReader();
    reader.onload = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        console.log(imgBlob);
        formData.append('file', imgBlob, file.name);
        this.uploadCareSite(imgBlob, file.name);
        //this.uploadImageData(formData);
        //this.addImageToFirebase(imgBlob);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadCareSite(file, name) {
    file.width = "10px";
    const data = new FormData();
    data.append("file", file, name);
    data.append("UPLOADCARE_STORE", "1");
    data.append("UPLOADCARE_PUB_KEY", "75fa15a18f29623048ab");

    const loading = await this.loadingController.create({
      message: 'Uploading image...',
     });
    await loading.present();
  

    this.http.post("https://upload.uploadcare.com/base/", data)
      .subscribe((event: any)=> {
        console.log(event);
        this.imageURL = event.file;
        const model = {
          "id": this.userId,
          "url": this.imageURL
        }
        this.http.get(`https://ucarecdn.com/${this.imageURL}/detect_faces/`)
        .subscribe((event: any) => {
            this.noFace = event.faces == 0;
            console.log("Ioana");
            console.log(event.faces);
            if (event.faces.length == 1) {
                this.http.post("https://192.168.43.212:5001/api/users/postImagePath", model)
                .pipe(
                  finalize(() => {
                      loading.dismiss();
                  })
                )
                .subscribe(res => {
                    if (res['success']) {
                        this.presentToast('File upload complete.', "success");
                        this.pictureUrl = res["imageUrl"];
                    } else {
                        this.presentToast('File upload failed.', "warning");
                    }
                });

                const model1 = {
                  "UserId": this.userId,
                  "HistoryImageUrl": this.imageURL
                }

                this.imageHistoryService.saveHistoryImage(model1).subscribe(res => {
                  console.log(res);
                })

            } else {
              loading.dismiss();
              if (event.faces.length == 0) {
                this.presentAlert("No faces");
              } else {
                this.presentAlert("More faces");
              }

            }
        })
       
         
      })
  }

  async presentAlert(text) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  addImageToFirebase(file) {
    var n = Date.now();
    const filePath = `ProfileImages/${n}`;
    const fileRef = this.st.ref(filePath);
    const task = this.st.upload(`ProfileImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              console.log(url);
              this.fb = url;

            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
        message: 'Uploading image...',
    });
    await loading.present();
   
    this.http.post("https://192.168.43.212:5001/api/users/uploadImg/" + this.userId, formData)
        .pipe(
            finalize(() => {
                loading.dismiss();
            })
        )
        .subscribe(res => {
            if (res['success']) {
                this.presentToast('File upload complete.', "success");
                this.pictureUrl = res["imageUrl"];
            } else {
                this.presentToast('File upload failed.', "warning");
            }
        });
}

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
 
    this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        let filtered = arr.filter(name => name != imgEntry.name);
        this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
 
        var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
 
        this.file.removeFile(correctPath, imgEntry.name).then(res => {
            this.presentToast('File removed.', "success");
        });
    });
  }

  goToModifyProfile() {
    this.setNavigation(this.typeView, "modify-profile");
  }


  goToChangePassword() {
    this.setNavigation(this.typeView, "reset-password-profile");
  }

  goToHistoryImages() {
    //this.setNavigation(this.typeView, "image-history");
    this.navControl.navigateRoot(["image-history"]);
  }



 
  setNavigation(param: string, url: string)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param,
          special: JSON.stringify(this.user)
      }
    };
    
    this.navControl.navigateForward([url],navigationExtras);
    //this.navControl.navigateBack("request");
  }

  doGoogleLogout(){
    this.googlePlus.logout()
    .then(res => {
      //user logged out so we will remove him from the NativeStorage
      this.nativeStorage.remove('google_user');
    }, err => {
      console.log(err);
    });
  }


  logOut() {
    if (localStorage.getItem("googleLogin") == "1") {
      localStorage.setItem("googleLogin", "0");
      this.doGoogleLogout();
    } else {
      localStorage.removeItem('token');
    }
    this.presentToast("Log out successfully", "success");
    this.navControl.navigateRoot(["login"]);

  }

  goToReview() {
    this.navControl.navigateRoot(["review"]);
  }

  goToNotification() {
    this.navControl.navigateRoot(["notification"]);
  }

  goToDefaultCard() {
    this.navControl.navigateRoot(["default-card"]);
  }

  goToChangeLanguage() {
    this.navControl.navigateRoot(["change-language"]);
  }
  
}


