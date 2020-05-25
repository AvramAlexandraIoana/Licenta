import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestMoneyPage } from './request-money.page';

describe('RequestMoneyPage', () => {
  let component: RequestMoneyPage;
  let fixture: ComponentFixture<RequestMoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMoneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
