import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFancyLoggerComponent } from './ngx-fancy-logger.component';

describe('NgxFancyLoggerComponent', () => {
  let component: NgxFancyLoggerComponent;
  let fixture: ComponentFixture<NgxFancyLoggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFancyLoggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFancyLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
