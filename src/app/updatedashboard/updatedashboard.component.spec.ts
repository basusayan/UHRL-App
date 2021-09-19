import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedashboardComponent } from './updatedashboard.component';

describe('UpdatedashboardComponent', () => {
  let component: UpdatedashboardComponent;
  let fixture: ComponentFixture<UpdatedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
