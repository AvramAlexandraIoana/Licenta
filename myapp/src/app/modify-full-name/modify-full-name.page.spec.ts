import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyFullNamePage } from './modify-full-name.page';

describe('ModifyFullNamePage', () => {
  let component: ModifyFullNamePage;
  let fixture: ComponentFixture<ModifyFullNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyFullNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyFullNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
