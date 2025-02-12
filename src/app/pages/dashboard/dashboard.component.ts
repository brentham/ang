import { Component } from '@angular/core';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { StatsCard2Component } from '../../components/stats-card2/stats-card2.component';
import { ChartCard2Component } from '../../components/chart-card2/chart-card2.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

interface StatsCard {
  icon: string;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
  warning?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,MatCardModule, MatListModule,MatSelectModule, MatOptionModule,MatIconModule,MatButtonModule,MatToolbarModule,MatTabsModule,MatTableModule,MatCheckboxModule,MatTooltipModule,StatsCard2Component, ChartCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  statsCards: StatsCard[] = [
    {
      icon: 'storage',
      iconBg: '#ff9800',
      title: 'Used Space',
      value: '49/50 GB',
      subtitle: 'Get More Space...',
      warning: true
    },
    {
      icon: 'store',
      iconBg: '#4caf50',
      title: 'Revenue',
      value: '$34,245',
      subtitle: 'Last 24 Hours'
    },
    {
      icon: 'info_outline',
      iconBg: '#f44336',
      title: 'Fixed Issues',
      value: '75',
      subtitle: 'Tracked from Github'
    },
    {
      icon: 'twitter',
      iconBg: '#03a9f4',
      title: 'Followers',
      value: '+245',
      subtitle: 'Just Updated'
    }
  ];

  dailySalesData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    values: [7, 12, 3, 12, 15, 12, 32]
  };

  emailData = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    values: [400, 300, 250, 700, 400, 300, 250, 350, 400, 450, 500, 700]
  };

  tasksData = {
    labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    values: [400, 600, 300, 200, 200, 150, 100, 100]
  };

  tasks = [
    'Sign contract for "What are conference organizers afraid of?"',
    'Lines From Great Russian Literature? Or E-mails From My Boss?',
    'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit'
  ];

  employees = [
    { id: 1, name: 'Dakota Rice', salary: 36738, country: 'Niger' },
    { id: 2, name: 'Minerva Hooper', salary: 23789, country: 'Curaçao' }
  ];

  employeeColumns = ['id', 'name', 'salary', 'country'];
}
