import { Component, OnInit } from '@angular/core';
import { ImageHistoryService } from '../api/image-history.service';
import { HistoryImage } from '../_models/HistoryImage';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-image-history',
  templateUrl: './image-history.page.html',
  styleUrls: ['./image-history.page.scss'],
})
export class ImageHistoryPage implements OnInit {


  historyImages: Array<HistoryImage> = [];
  pictureUrl: any;
  constructor(private historyImageService: ImageHistoryService,
            private http: HttpClient,
            private toastController: ToastController,
            private loadingController: LoadingController,
            private navControl: NavController) { }

  ngOnInit() {
    this.historyImageService.getHistoryImageList().subscribe(res => {
      console.log(res);
      this.historyImages = res;
    })
  }

  deleteImage(img, pos) {
    this.historyImages.splice(pos, 1);
    this.historyImageService.deleteHistoryImage(img.historyImageId).subscribe(res => {
      console.log("Image stearsa");
    });
  }


  async startUpload(img) {

    const loading = await this.loadingController.create({
      message: 'Uploading image...',
     });
    await loading.present();

    const model = {
      "id": img.userId,
      "url": img.historyImageUrl
    }
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

  
  dismiss() {
    this.navControl.navigateBack("tabs/tab5");
    
   }



}
