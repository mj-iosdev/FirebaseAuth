import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpVarificationPage } from './otp-varification.page';

describe('OtpVarificationPage', () => {
  let component: OtpVarificationPage;
  let fixture: ComponentFixture<OtpVarificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpVarificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpVarificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
