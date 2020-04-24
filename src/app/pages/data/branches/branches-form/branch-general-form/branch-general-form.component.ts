import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { BranchDetails } from 'src/app/open-api';

@Component({
  selector: 'app-branch-general-form',
  templateUrl: './branch-general-form.component.html',
  styleUrls: ['./branch-general-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class BranchGeneralFormComponent implements OnInit {

  @Input() branch: BranchDetails;

  @Input() disabled = true;

  @Input() shippingMethodsAvailable: SelectItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
