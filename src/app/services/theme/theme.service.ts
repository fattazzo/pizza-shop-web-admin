import { Injectable } from '@angular/core';
import { Theme } from './theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private static THEME_STORAGE_KEY = 'current-theme';

  init() {
    this.changeTheme(this.loadSavedTheme() || Theme.LUNA_GREEN);
  }

  /**
  * Change application theme
  *
  * @param theme new theme
  */
  changeTheme(theme: Theme) {
    // Theme
    let themeElement = document.getElementById('theme-css');
    var href = themeElement.getAttribute('href');
    let themeToReplace = href.substring(href.indexOf('themes') + 7, href.length - 10);
    themeElement.setAttribute('href', themeElement.getAttribute('href').replace(themeToReplace, theme));

    // Custom theme colors
    let themeColorElement = document.getElementById('theme-color-css');
    href = themeColorElement.getAttribute('href');
    let themeColorsToReplace = href.substring(href.indexOf('themes-custom-colors') + 21, href.length - 11);
    themeColorElement.setAttribute('href', themeColorElement.getAttribute('href').replace(themeColorsToReplace, theme));

    localStorage.setItem(ThemeService.THEME_STORAGE_KEY, theme);
  }

  /**
   * Current configured theme.
   *
   * @returns current theme
   */
  getCurrentTheme(): Theme {
    let themeElement = document.getElementById('theme-css');
    let href = themeElement.getAttribute('href');
    let index = href.indexOf('themes');
    let themeString = href.substring(index + 7, href.length - 10);

    return Theme[themeString] || Theme.RHEA;
  }

  /**
   * Load current saved theme from storage.
   *
   * @returns current theme, null if not present
   */
  private loadSavedTheme(): Theme | null {
    let themeString = localStorage.getItem(ThemeService.THEME_STORAGE_KEY);

    if (themeString != null) {
      return Theme[themeString];
    }
    return null;
  }
}
