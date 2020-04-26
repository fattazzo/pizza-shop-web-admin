import { Component, OnInit } from '@angular/core';
import { Dough, Size, ToppingExtra, VariationsService } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';

@Component({
  selector: 'app-topping-prices',
  templateUrl: './topping-prices.component.html',
  styleUrls: ['./topping-prices.component.scss']
})
export class ToppingPricesComponent implements OnInit {

  doughs: Dough[] = [];
  doughSelected: Dough;

  sizes: Size[] = [];
  sizeSelected: Size;

  loading = false;
  toppingExtras: ToppingExtra[] = [];

  constructor(
    private variationsService: VariationsService,
    private appMessageService: AppMessageService
  ) { }

  ngOnInit() {
    this.variationsService.getDoughs(true).subscribe(d => this.doughs = d);
    this.variationsService.getSizes(true).subscribe(s => this.sizes = s);
  };

  onParametersChange() {
    if (!this.doughSelected || !this.sizeSelected) { return }

    this.loading = true;
    this.variationsService.getToppingExtras(this.doughSelected.id, this.sizeSelected.id)
      .subscribe(te => {
        this.toppingExtras = te;
        this.loading = false
      },
        _error => this.loading = false);
  }

  saveExtras() {
    this.variationsService.updateToppingExtras(this.toppingExtras).subscribe(te => {
      this.toppingExtras = te;
      this.appMessageService.addSuccessfullUpdate();
    });
  }

}
