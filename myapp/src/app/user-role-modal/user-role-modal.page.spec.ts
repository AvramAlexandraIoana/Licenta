import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserRoleModalPage } from './user-role-modal.page';

describe('UserRoleModalPage', () => {
  let component: UserRoleModalPage;
  let fixture: ComponentFixture<UserRoleModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRoleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
