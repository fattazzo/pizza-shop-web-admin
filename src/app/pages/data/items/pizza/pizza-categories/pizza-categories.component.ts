import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { map } from 'rxjs/operators';
import { Category, CategoryDetails, ItemType, PizzacategoriesService, PizzavariationsService, Role } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { AuthUtils } from 'src/app/utils/auth-utils';

@Component({
  selector: 'app-pizza-categories',
  templateUrl: './pizza-categories.component.html',
  styleUrls: ['./pizza-categories.component.scss']
})
export class PizzaCategoriesComponent implements OnInit {

  loading = false;

  categories: Category[] = [];
  categorySelected: Category;
  categoryForm: CategoryDetails;

  doughs: SelectItem[];
  sizes: SelectItem[];

  constructor(
    private pizzacategoriesService: PizzacategoriesService,
    private variationsService: PizzavariationsService,
    private authUtils: AuthUtils,
    private appMessageService: AppMessageService
  ) { }

  ngOnInit(): void {
    this.onNew()

    this.variationsService.getDoughs(true)
      .pipe(map(doughs => doughs.map(d => { return { label: d.name, value: d } })))
      .subscribe(d => this.doughs = d);
    this.variationsService.getSizes(true)
      .pipe(map(sizes => sizes.map(s => { return { label: s.name, value: s } })))
      .subscribe(s => this.sizes = s);

    this.loading = true;
    this.pizzacategoriesService.getPizzaCategories(true)
      .subscribe(result => {
        this.loading = false;
        this.categories = result;
      }, _error => {
        this.loading = false;
      })
  }

  onRowSelect(event) {
    this.pizzacategoriesService.getPizzaCategory(event.data.id)
      .subscribe(c => this.categoryForm = c);
  }

  onNew() {
    this.categoryForm = { id: null, name: null, enabled: true, type: ItemType.PIZZA }
  }

  onSubmit() {
    if (this.categoryForm.id) {
      this.editProductCategory();
    } else {
      this.createProductCategory();
    }
  }

  private createProductCategory() {
    this.pizzacategoriesService.createPizzaCategory(this.categoryForm).subscribe(result => {
      this.categories.push(result);
      this.categoryForm = result;
      this.categorySelected = result;
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editProductCategory() {
    this.pizzacategoriesService.updatePizzaCategory(this.categoryForm, this.categoryForm.id).subscribe(result => {
      const toppingFound = this.categories.find(obj => obj.id === result.id);
      if (toppingFound !== undefined) {
        const index = this.categories.indexOf(toppingFound);
        if (index !== -1) {
          this.categories[index] = result;
        }
      }
      this.categoryForm = result;
      this.categorySelected = result;

      this.appMessageService.addSuccessfullUpdate();
    })
  }

  onDelete() {
    var deleteFunc = () => {
      this.pizzacategoriesService.deletePizzaCategory(this.categoryForm.id)
        .subscribe(() => {
          this.categories = this.categories.filter(obj => obj.id !== this.categoryForm.id)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  hasEditRole(): boolean {
    return this.authUtils.isInRole([Role.PRODUCTS])
  }

}

