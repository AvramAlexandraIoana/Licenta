import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewListPage } from './review-list.page';

describe('ReviewListPage', () => {
  let component: ReviewListPage;
  let fixture: ComponentFixture<ReviewListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
