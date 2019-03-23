import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagedCampaignsComponent} from './managed-campaigns.component';

describe('ManagedCampaignsComponent', () => {
  let component: ManagedCampaignsComponent;
  let fixture: ComponentFixture<ManagedCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
