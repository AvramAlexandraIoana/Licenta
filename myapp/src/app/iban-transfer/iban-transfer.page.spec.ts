import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IbanTransferPage } from './iban-transfer.page';

describe('IbanTransferPage', () => {
  let component: IbanTransferPage;
  let fixture: ComponentFixture<IbanTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbanTransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IbanTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
