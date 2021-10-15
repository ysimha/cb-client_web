import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotDashboardComponent } from './bot-dashboard.component';

describe('BotDashboardComponent', () => {
  let component: BotDashboardComponent;
  let fixture: ComponentFixture<BotDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
