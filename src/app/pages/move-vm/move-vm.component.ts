// move-vm.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-move-vm',
  standalone: false,
  templateUrl: './move-vm.component.html',
  styleUrls: ['./move-vm.component.scss']
})
export class MoveVmComponent implements OnInit {
  moveVmForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    // Add your VM service here
  ) {
    this.moveVmForm = this.fb.group({
      vmId: ['', Validators.required],
      targetLocation: ['', Validators.required],
      // Add more form controls as needed
    });
  }

  ngOnInit(): void {
    // Initialize any required data
  }

  onSubmit(): void {
    if (this.moveVmForm.valid) {
      this.isLoading = true;
      // Add your VM moving logic here
      console.log(this.moveVmForm.value);
    }
  }
}