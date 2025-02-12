import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-stat-card',
  imports: [MatCardModule, MatIcon, CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() value!: string;
  @Input() subtitle!: string;
  @Input() warning: boolean = false;
}
