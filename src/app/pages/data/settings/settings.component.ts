import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/open-api/api/settings.service';
import { Settings } from 'src/app/open-api/model/settings';
import { AppMessageService } from 'src/app/services/app-message.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private session: SessionService,
    private appMessageService: AppMessageService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(s => this.settings = s);
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settings)
      .subscribe(result => {
        this.settings = result;
        this.session.setSettings(this.settings);
        this.appMessageService.addSuccessfullUpdate();
      })
  }

}
