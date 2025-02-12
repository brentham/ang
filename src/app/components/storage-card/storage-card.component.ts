import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-storage-card',
  imports: [MatCardModule,MatIconModule],
  templateUrl: './storage-card.component.html',
  styleUrl: './storage-card.component.scss'
})
export class StorageCardComponent {
  @Input() used: number = 49;
  @Input() total: number = 50;
  @Input() unit: string = 'GB';
}
