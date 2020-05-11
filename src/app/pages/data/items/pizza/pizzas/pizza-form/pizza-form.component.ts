import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectItem } from 'primeng/api/selectitem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration, ItemPizza, ItemPizzaPrice, PizzacategoriesService, PizzasService, PizzavariationsService, VariationSize } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
import { PizzasComponentService } from '../service/pizzas-component.service';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss']
})
export class PizzaFormComponent implements OnInit {

  pizza: ItemPizza;
  @Output() itemPizza = new EventEmitter<ItemPizza>();

  categories: SelectItem[];

  sizes: VariationSize[] = [];

  imageItem: any = null;
  imageLoading = false;

  basePathUrl: string;

  constructor(
    private pizzasComponentService: PizzasComponentService,
    private pizzasService: PizzasService,
    private pizzacategoriesService: PizzacategoriesService,
    private pizzavariationsService: PizzavariationsService,
    private appMessageService: AppMessageService,
    public session: SessionService,
    private sanitizer: DomSanitizer,
    @Optional() configuration: Configuration,
    private httpClient: HttpClient,
  ) {
    this.basePathUrl = configuration.basePath;
  }

  ngOnInit(): void {
    this.onNew()

    this.pizzavariationsService.getSizes(true).subscribe(s => {
      this.sizes = s
      this.onNew()
    });

    this.pizzacategoriesService.getPizzaCategories(true)
      .pipe(map(categories => categories.map(cat => { return { label: cat.name, value: cat } })))
      .subscribe(c => this.categories = c);

    this.pizzasComponentService.pizzaSelected.subscribe(p => {
      this.pizzasService.getItemPizza(p.id, true).subscribe(pd => {
        this.pizza = pd;
        this.pizza.prices?.sort(function (a, b) {
          return (a.size.order || Number.MAX_VALUE) - (b.size.order || Number.MAX_VALUE) || a.size.order - b.size.order;
        })
        this.itemPizza.emit(this.pizza);
        this.updateImageItem();
      })
    });
  }

  onNew() {
    this.pizza = { id: null, name: null, description: null, enabled: true, category: null, doughs: null, sizes: null, toppingExtras: null };
    this.pizza.prices = this.sizes.map(size => { return <ItemPizzaPrice>{ id: null, size: size, price: 0 } })

    this.imageItem = null;
    this.itemPizza.emit(null);
  }

  onSubmit() {
    if (this.pizza.id) {
      this.editPizza();
    } else {
      this.createPizza();
    }
  }

  onDelete() {
    var deleteFunc = () => {
      this.pizzasService.deleteItemPizza(this.pizza.id)
        .subscribe(() => {
          this.pizzasComponentService.deletePizza(this.pizza)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  private createPizza() {
    this.pizzasService.createItemPizza(this.pizza).subscribe(result => {
      this.pizza = result;
      this.pizzasComponentService.modifyPizza(this.pizza);
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editPizza() {
    this.pizzasService.updateItemPizza(this.pizza, this.pizza.id).subscribe(result => {
      this.pizza = result;
      this.pizzasComponentService.modifyPizza(this.pizza);
      this.appMessageService.addSuccessfullUpdate();
    })
  }

  openFile() {
    (document.querySelector('.inputUpload') as HTMLInputElement).click()
  }

  handle(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.pizzasService.updateItemPizzaImage(file, this.pizza.id).subscribe(() => {
        this.pizzasService.getItemPizza(this.pizza.id).subscribe(pd => {
          this.pizza = pd;
          this.updateImageItem();
          this.appMessageService.addSuccessfullUpdate();
        })
      })
    }
  }

  onDeleteImage() {
    var deleteFunc = () => {
      this.pizzasService.deleteItemPizzaImage(this.pizza.id)
        .subscribe(() => {
          this.updateImageItem();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  private updateImageItem() {
    this.imageItem = null;
    this.imageLoading = true;
    this.getPizzaImage(this.pizza.id)
      .subscribe(image => {
        if (image) {
          let objectURL = URL.createObjectURL(image);
          this.imageItem = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        this.imageLoading = false;
      },
        _error => this.imageLoading = false
      )
  }

  public getPizzaImage(pizzaId: number): Observable<Blob> {
    let headers = new HttpHeaders().set('Accept', 'image/png');
    return this.httpClient.request<Blob>('get', `${this.basePathUrl}/pizza/items/${encodeURIComponent(String(pizzaId))}/image`,
      {
        responseType: <any>'blob',
        headers: headers,
        observe: 'body',
        reportProgress: false
      }
    );
  }

}
