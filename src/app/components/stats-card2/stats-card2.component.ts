import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card2',
  imports: [MatCardModule, MatIcon, CommonModule],
  templateUrl: './stats-card2.component.html',
  styleUrl: './stats-card2.component.scss'
})
export class StatsCard2Component {
  @Input() icon!: string;
  @Input() iconBg!: string;
  @Input() title!: string;
  @Input() value!: string;
  @Input() subtitle!: string;
  @Input() warning: boolean = false;
}
