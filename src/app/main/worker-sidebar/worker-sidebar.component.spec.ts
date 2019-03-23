import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkerSidebarComponent} from './worker-sidebar.component';

describe('WorkerSidebarComponent', () => {
  let component: WorkerSidebarComponent;
  let fixture: ComponentFixture<WorkerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
