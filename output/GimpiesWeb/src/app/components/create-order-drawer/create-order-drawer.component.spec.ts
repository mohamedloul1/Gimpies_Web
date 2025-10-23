import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderDrawerComponent } from './create-order-drawer.component';

describe('CreateOrderDrawerComponent', () => {
  let component: CreateOrderDrawerComponent;
  let fixture: ComponentFixture<CreateOrderDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
