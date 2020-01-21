import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeetimesPage } from './teetimes.page';

describe('TeetimesPage', () => {
  let component: TeetimesPage;
  let fixture: ComponentFixture<TeetimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeetimesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeetimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
