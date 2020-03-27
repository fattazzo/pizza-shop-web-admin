import { Component } from '@angular/core';
import { Theme } from './services/theme/theme';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzaroad-web-app';

  theme = Theme;

  constructor(private themeService: ThemeService) { }

  changeTheme(event, theme: Theme) {
    this.themeService.changeTheme(theme);
    event.preventDefault();

  }
}
