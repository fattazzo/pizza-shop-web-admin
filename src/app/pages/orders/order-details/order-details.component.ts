import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderDetails } from 'src/app/open-api';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: OrderDetails;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.order = this.config.data.order;
  }

  close() {
    if (this.ref) {
      this.ref.close(null);
    }
  }
}
