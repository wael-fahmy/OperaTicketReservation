import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAuthorityComponent } from './approve-authority.component';

describe('ApproveAuthorityComponent', () => {
  let component: ApproveAuthorityComponent;
  let fixture: ComponentFixture<ApproveAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
