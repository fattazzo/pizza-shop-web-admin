import { Component, OnInit } from '@angular/core';
import { Dashboard, DashboardService } from 'src/app/open-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dashboard: Dashboard;

  loading = false;

  pendingOrdersCounter = 0;
  processingOrdersCounter = 0;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.dashboardService.getDashboard().subscribe(d => {
      this.dashboard = d;
      this.loading = false;
    },
      _error => this.loading = false);
  }

  onPendingOrdersCounterChange(value: number) {
    this.pendingOrdersCounter = value
  }

  onProcessingOrdersCounterChange(value: number) {
    this.processingOrdersCounter = value
  }

}
