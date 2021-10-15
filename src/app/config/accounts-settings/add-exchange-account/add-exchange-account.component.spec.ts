import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExchangeAccountComponent } from './add-exchange-account.component';

describe('AddExchangeAccountComponent', () => {
  let component: AddExchangeAccountComponent;
  let fixture: ComponentFixture<AddExchangeAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExchangeAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExchangeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
