import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactManagementPage } from './contact-management.page';

describe('ContactManagementPage', () => {
  let component: ContactManagementPage;
  let fixture: ComponentFixture<ContactManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
