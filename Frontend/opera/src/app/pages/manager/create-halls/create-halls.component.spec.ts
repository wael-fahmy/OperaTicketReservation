import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHallsComponent } from './create-halls.component';

describe('CreateHallsComponent', () => {
  let component: CreateHallsComponent;
  let fixture: ComponentFixture<CreateHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
