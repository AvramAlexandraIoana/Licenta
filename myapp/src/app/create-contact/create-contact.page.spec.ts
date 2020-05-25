import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateContactPage } from './create-contact.page';

describe('CreateContactPage', () => {
  let component: CreateContactPage;
  let fixture: ComponentFixture<CreateContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
