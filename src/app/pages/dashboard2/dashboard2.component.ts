import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';
import { StorageCardComponent } from '../../components/storage-card/storage-card.component';

@Component({
  selector: 'app-dashboard2',
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatToolbarModule,MatTabsModule,MatTableModule,MatCheckboxModule,MatTooltipModule,StatCardComponent,ChartCardComponent,TaskListComponent,EmployeeTableComponent,StorageCardComponent],
  templateUrl: './dashboard2.component.html',
  styleUrl: './dashboard2.component.scss'
})
export class Dashboard2Component {
  inventoryCount: number = 1234; // Example inventory count
  dailySalesData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      data: [5, 12, 3, 12, 15, 10, 30],
      borderColor: '#4CAF50',
      fill: false
    }]
  };

  emailSubscriptionData = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    datasets: [{
      data: [400, 300, 250, 700, 400, 300, 250, 350, 400, 450, 500, 700],
      backgroundColor: '#FFA726'
    }]
  };

  completedTasksData = {
    labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    datasets: [{
      data: [400, 600, 300, 200, 200, 150, 100, 100],
      borderColor: '#ef5350',
      fill: false
    }]
  };
}
