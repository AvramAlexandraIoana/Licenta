import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from '../api/review.service';
import { Review } from '../_models/Review';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ReviewModalPage } from '../review-modal/review-modal.page';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.page.html',
  styleUrls: ['./review-list.page.scss'],
})
export class ReviewListPage implements OnInit {
  reviews: Review[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  nr1: number;
  nr2: number;
  isSort: boolean;
  sortBy: number;
  name: any;
  valid: boolean;
  language: string;


  constructor(private reviewService: ReviewService,
              private modalControl: ModalController) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    this.nr1 = 0;
    this.nr2 = 10;
    this.isSort = true;
    this.sortBy = 0;
    this.name = null;

    this.loadData1();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  sort() {
    console.log("sort icon");
    if (this.isSort) {
      console.log("Sortare descrecatoare");
      this.isSort = false;
      this.sortBy = 1;

    } else {
      this.isSort = true;
      this.sortBy = 0;
    }
    this.nr1 = 0;
    this.nr2 = 10;

    this.reviewService.getReviewsSkip(this.nr1, this.nr2, this.sortBy, this.name).subscribe(res => {
      console.log(res);
      this.reviews = res;
    });

  }

  async reviewType() {
    const modal = await this.modalControl.create({
      component: ReviewModalPage,
      backdropDismiss: true
    });


    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("data is  " + data);
    this.valid = false;
    if (data) {
      for (var i = 0; i < data.length; i++)
        if (data[i].checked) {
          localStorage.setItem("type", data[i].value);
          this.nr1 = 0;
          this.nr2 = 10;
          this.valid = true;
          this.name = data[i].value;
          this.reviewService.getReviewsSkip(this.nr1, this.nr2, this.sortBy, this.name).subscribe(res => {
            console.log(res);
            this.reviews = res;
          });
        } 

      if (!this.valid) {
        this.name = null;
        localStorage.setItem("type", null);

      }
    }
  }

  ionViewWillLeave() {
    localStorage.setItem("type", null);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.nr1 = this.nr2;
      this.nr2 += 10;
      this.reviewService.getReviewsSkip(this.nr1, this.nr2, this.sortBy, this.name).subscribe(res => {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
          this.reviews.push(res[i]);
        }
      });

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.reviews.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }


  loadData1() {
    this.reviewService.getReviewsSkip(this.nr1, this.nr2, this.sortBy, this.name).subscribe(res => {
      console.log(res);
      this.reviews = res;
    })
  }

}
