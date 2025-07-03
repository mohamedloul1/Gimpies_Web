import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeMiniCardComponent } from './shoe-mini-card.component';

describe('ShoeMiniCardComponent', () => {
  let component: ShoeMiniCardComponent;
  let fixture: ComponentFixture<ShoeMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoeMiniCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
