import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTransactionModalPage } from './add-transaction-modal.page';

describe('AddTransactionModalPage', () => {
  let component: AddTransactionModalPage;
  let fixture: ComponentFixture<AddTransactionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTransactionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
