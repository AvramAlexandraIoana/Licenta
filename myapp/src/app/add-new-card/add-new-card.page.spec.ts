import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewCardPage } from './add-new-card.page';

describe('AddNewCardPage', () => {
  let component: AddNewCardPage;
  let fixture: ComponentFixture<AddNewCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
