import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerTransferMoneyPage } from './manager-transfer-money.page';

describe('ManagerTransferMoneyPage', () => {
  let component: ManagerTransferMoneyPage;
  let fixture: ComponentFixture<ManagerTransferMoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTransferMoneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerTransferMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
