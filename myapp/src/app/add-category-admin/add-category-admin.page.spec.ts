import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCategoryAdminPage } from './add-category-admin.page';

describe('AddCategoryAdminPage', () => {
  let component: AddCategoryAdminPage;
  let fixture: ComponentFixture<AddCategoryAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
