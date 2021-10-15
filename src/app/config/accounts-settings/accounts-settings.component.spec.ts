import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsSettingsComponent } from './accounts-settings.component';

describe('AccountsSettingsComponent', () => {
  let component: AccountsSettingsComponent;
  let fixture: ComponentFixture<AccountsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
