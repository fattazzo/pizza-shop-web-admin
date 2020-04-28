import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectItem } from 'primeng/api/selectitem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration, ProductDetails, ProductsService } from 'src/app/open-api';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';
import { ProductsComponentService } from '../service/products-component.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: ProductDetails;
  @Output() productDetails = new EventEmitter<ProductDetails>();

  categories: SelectItem[];

  imageItem: any = null;
  imageLoading = false;

  basePathUrl: string;

  constructor(
    private productsComponentService: ProductsComponentService,
    private productService: ProductsService,
    private appMessageService: AppMessageService,
    public session: SessionService,
    private sanitizer: DomSanitizer,
    @Optional() configuration: Configuration,
    private httpClient: HttpClient,
  ) {
    this.basePathUrl = configuration.basePath;
  }

  ngOnInit(): void {
    this.onNew();

    this.productService.getProductCategories()
      .pipe(map(categories => categories.map(cat => { return { label: cat.name, value: cat } })))
      .subscribe(c => this.categories = c);

    this.productsComponentService.productSelected.subscribe(p => {
      this.productService.getProduct(p.id).subscribe(pd => {
        this.productDetails.emit(pd);
        this.product = pd;
        this.updateImageItem();
      })
    });
  }

  onNew() {
    this.product = { id: null, name: null, description: null, enabled: true, price: 0, category: null, doughs: null, sizes: null, toppingExtras: null };
    this.imageItem = null;
    this.productDetails.emit(null);
  }

  onSubmit() {
    if (this.product.id) {
      this.editProduct();
    } else {
      this.createProduct();
    }
  }

  onDelete() {
    var deleteFunc = () => {
      this.productService.deleteProduct(this.product.id)
        .subscribe(() => {
          this.productsComponentService.deleteProduct(this.product)
          this.onNew();
          this.appMessageService.addSuccessfullDelete();
        });
    }

    this.appMessageService.confirmDelete(deleteFunc);
  }

  private createProduct() {
    this.productService.createProduct(this.product).subscribe(result => {
      this.product = result;
      this.productsComponentService.modifyProduct(this.product);
      this.appMessageService.addSuccessfullInsert();
    })
  }

  private editProduct() {
    this.productService.updateProduct(this.product, this.product.id).subscribe(result => {
      this.product = result;
      this.productsComponentService.modifyProduct(this.product);
      this.appMessageService.addSuccessfullUpdate();
    })
  }

  openFile() {
    (document.querySelector('.inputUpload') as HTMLInputElement).click()
  }

  handle(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.productService.updateProductImage(file, this.product.id).subscribe(() => {
        this.productService.getProduct(this.product.id).subscribe(pd => {
          this.product = pd;
          this.updateImageItem();
          this.appMessageService.addSuccessfullUpdate();
        })
      })
    }
  }

  onDeleteImage() {
    var deleteFunc = () => {
      this.productService.deleteProductImage(this.product.id)
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
    this.getProductImage(this.product.id)
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

  public getProductImage(productId: number): Observable<Blob> {
    let headers = new HttpHeaders().set('Accept', 'image/png');
    return this.httpClient.request<Blob>('get', `${this.basePathUrl}/products/${encodeURIComponent(String(productId))}/image`,
      {
        responseType: <any>'blob',
        headers: headers,
        observe: 'body',
        reportProgress: false
      }
    );
  }

}
