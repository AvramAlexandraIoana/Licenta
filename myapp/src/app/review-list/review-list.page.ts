import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from '../api/review.service';
import { Review } from '../_models/Review';
import { IonInfiniteScroll } from '@ionic/angular';

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


  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.nr1 = 0;
    this.nr2 = 10;
    this.isSort = true;
    this.sortBy = 0;

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

    this.reviewService.getReviewsSkip(this.nr1, this.nr2, this.sortBy).subscribe(res => {
      console.log(res);
      this.reviews = res;
    });

  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.nr1 = this.nr2;
      this.nr2 += 10;
      this.reviewService.getReviewsSkip(this.nr1, this.nr2, this.sortBy).subscribe(res => {
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
    this.reviewService.getReviewsSkip(this.nr1, this.nr2, this.sortBy).subscribe(res => {
      console.log(res);
      this.reviews = res;
    })
  }

}
