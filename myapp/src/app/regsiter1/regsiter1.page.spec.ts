import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Regsiter1Page } from './regsiter1.page';

describe('Regsiter1Page', () => {
  let component: Regsiter1Page;
  let fixture: ComponentFixture<Regsiter1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regsiter1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Regsiter1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
