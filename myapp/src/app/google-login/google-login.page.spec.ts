import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoogleLoginPage } from './google-login.page';

describe('GoogleLoginPage', () => {
  let component: GoogleLoginPage;
  let fixture: ComponentFixture<GoogleLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
