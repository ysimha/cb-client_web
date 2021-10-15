import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotInstanceComponent } from './bot-instance.component';

describe('BotInstanceComponent', () => {
  let component: BotInstanceComponent;
  let fixture: ComponentFixture<BotInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
