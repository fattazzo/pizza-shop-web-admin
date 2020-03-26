import { Component } from '@angular/core';
import { DomHandler } from './dom-handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaroad-web-app';

  theme = 'rhea';

  changeTheme(event, theme: string, dark: boolean) {
    let themeElement = document.getElementById('theme-css');
    themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.theme, theme));
    let themeColorElement = document.getElementById('theme-color-css');
    themeColorElement.setAttribute('href', themeColorElement.getAttribute('href').replace(this.theme, theme));
    this.theme = theme;
    const hasBodyDarkTheme = DomHandler.hasClass(document.body, 'dark-theme');

    if (dark) {
      if (!hasBodyDarkTheme) {
        DomHandler.addClass(document.body, 'dark-theme');
      }
    }
    else if (hasBodyDarkTheme) {
      DomHandler.removeClass(document.body, 'dark-theme');
    }

    event.preventDefault();

  }
}
