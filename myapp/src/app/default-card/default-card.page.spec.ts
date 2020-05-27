import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DefaultCardPage } from './default-card.page';

describe('DefaultCardPage', () => {
  let component: DefaultCardPage;
  let fixture: ComponentFixture<DefaultCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
