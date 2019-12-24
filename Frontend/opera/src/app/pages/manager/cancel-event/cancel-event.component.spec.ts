import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelEventComponent } from './cancel-event.component';

describe('CancelEventComponent', () => {
  let component: CancelEventComponent;
  let fixture: ComponentFixture<CancelEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
