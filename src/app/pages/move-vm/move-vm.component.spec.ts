import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveVmComponent } from './move-vm.component';

describe('MoveVmComponent', () => {
  let component: MoveVmComponent;
  let fixture: ComponentFixture<MoveVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
