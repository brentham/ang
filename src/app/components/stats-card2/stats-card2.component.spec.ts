import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCard2Component } from './stats-card2.component';

describe('StatsCard2Component', () => {
  let component: StatsCard2Component;
  let fixture: ComponentFixture<StatsCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
