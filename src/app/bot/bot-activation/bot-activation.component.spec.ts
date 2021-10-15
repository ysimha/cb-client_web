import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotActivationComponent } from './bot-activation.component';

describe('BotActivationComponent', () => {
  let component: BotActivationComponent;
  let fixture: ComponentFixture<BotActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
