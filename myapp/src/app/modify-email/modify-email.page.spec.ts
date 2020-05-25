import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyEmailPage } from './modify-email.page';

describe('ModifyEmailPage', () => {
  let component: ModifyEmailPage;
  let fixture: ComponentFixture<ModifyEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
