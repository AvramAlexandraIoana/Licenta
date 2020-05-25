import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyLocationInformationPage } from './modify-location-information.page';

describe('ModifyLocationInformationPage', () => {
  let component: ModifyLocationInformationPage;
  let fixture: ComponentFixture<ModifyLocationInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyLocationInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyLocationInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
