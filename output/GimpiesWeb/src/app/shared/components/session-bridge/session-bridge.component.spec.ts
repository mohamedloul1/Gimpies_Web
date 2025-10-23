import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionBridgeComponent } from './session-bridge.component';

describe('SessionBridgeComponent', () => {
  let component: SessionBridgeComponent;
  let fixture: ComponentFixture<SessionBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionBridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
