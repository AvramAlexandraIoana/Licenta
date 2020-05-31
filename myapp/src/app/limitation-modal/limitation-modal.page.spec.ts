import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LimitationModalPage } from './limitation-modal.page';

describe('LimitationModalPage', () => {
  let component: LimitationModalPage;
  let fixture: ComponentFixture<LimitationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LimitationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
