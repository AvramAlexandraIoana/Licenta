import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatSPage } from './chat-s.page';

describe('ChatSPage', () => {
  let component: ChatSPage;
  let fixture: ComponentFixture<ChatSPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatSPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
