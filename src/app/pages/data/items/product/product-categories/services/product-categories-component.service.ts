import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/open-api';

@Injectable()
export class ProductCategoriesComponentService {

  private categorySelectedSubjet = new Subject<Category>();
  private categoryDeletedSubject = new Subject<Category>();
  private categoryModifiedSubject = new Subject<Category>();

  categorySelected = this.categorySelectedSubjet.asObservable();
  selectCategory(category: Category) {
    this.categorySelectedSubjet.next(category);
  }

  categoryDeleted = this.categoryDeletedSubject.asObservable();
  deleteCategory(category: Category) {
    this.categoryDeletedSubject.next(category);
  }

  categoryModified = this.categoryModifiedSubject.asObservable();
  modifyCategory(category: Category) {
    this.categoryModifiedSubject.next(category);
  }
}
