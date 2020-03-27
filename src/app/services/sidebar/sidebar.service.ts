import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SideBarState } from './sidebar-state';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {

  private sidebarState$ = new BehaviorSubject<SideBarState>(SideBarState.EXPANDED);

  constructor() {
    this.sidebarState$.next(SideBarState.EXPANDED)
  }

  getSideBarState(): Observable<SideBarState> {
    return this.sidebarState$.asObservable();
  }

  toggleSideBar() {
    if (this.sidebarState$.getValue() === SideBarState.COLLAPSED) {
      this.sidebarState$.next(SideBarState.EXPANDED);
    } else {
      this.sidebarState$.next(SideBarState.COLLAPSED);
    }
  }

  setSideBarState(state: SideBarState) {
    this.sidebarState$.next(state);
  }

  hideSideBar() {
    this.sidebarState$.next(SideBarState.HIDE);
  }
}
