import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableApisComponent } from './available-apis.component';

describe('AvailableApisComponent', () => {
  let component: AvailableApisComponent;
  let fixture: ComponentFixture<AvailableApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableApisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
