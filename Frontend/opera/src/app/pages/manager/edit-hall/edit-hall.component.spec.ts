import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHallComponent } from './edit-hall.component';

describe('EditHallComponent', () => {
  let component: EditHallComponent;
  let fixture: ComponentFixture<EditHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
