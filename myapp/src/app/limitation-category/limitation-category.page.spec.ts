import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LimitationCategoryPage } from './limitation-category.page';

describe('LimitationCategoryPage', () => {
  let component: LimitationCategoryPage;
  let fixture: ComponentFixture<LimitationCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitationCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LimitationCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
