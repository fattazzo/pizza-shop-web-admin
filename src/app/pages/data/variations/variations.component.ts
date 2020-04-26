import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss']
})
export class VariationsComponent implements OnInit {

  variationTypes: SelectItem[] = []
  currentVariationType: string = 'dough'

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.buildVariationTypes();

    this.translate.onLangChange.subscribe((_event: LangChangeEvent) => {
      this.buildVariationTypes();
    });
  }

  private buildVariationTypes() {
    this.variationTypes = [
      { label: this.translate.instant('dough', [{ count: 2 }]), value: 'dough' },
      { label: this.translate.instant('size', [{ count: 2 }]), value: 'size' },
      { label: this.translate.instant('topping', [{ count: 2 }]), value: 'topping' },
      { label: this.translate.instant('extra', [{ count: 2 }]), value: 'topping-extra' }
    ]
  }

}
