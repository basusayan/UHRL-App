import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarycalculateComponent } from './salarycalculate.component';

describe('SalarycalculateComponent', () => {
  let component: SalarycalculateComponent;
  let fixture: ComponentFixture<SalarycalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarycalculateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarycalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
