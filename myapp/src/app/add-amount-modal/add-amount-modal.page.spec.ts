import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAmountModalPage } from './add-amount-modal.page';

describe('AddAmountModalPage', () => {
  let component: AddAmountModalPage;
  let fixture: ComponentFixture<AddAmountModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAmountModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAmountModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
