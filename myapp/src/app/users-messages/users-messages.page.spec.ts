import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersMessagesPage } from './users-messages.page';

describe('UsersMessagesPage', () => {
  let component: UsersMessagesPage;
  let fixture: ComponentFixture<UsersMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersMessagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
