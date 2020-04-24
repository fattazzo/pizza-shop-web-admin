import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss']
})
export class ProductsCategoriesComponent implements OnInit {

  types: SelectItem[] = []
  currentType: string = 'product-categories'

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.buildVariationTypes();

    this.translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildVariationTypes();
    });
  }

  private buildVariationTypes() {
    this.types = [
      { label: this.translate.instant('category', [{ count: 2 }]), value: 'product-categories' },
      { label: this.translate.instant('product', [{ count: 2 }]), value: 'product' }
    ]
  }

}
