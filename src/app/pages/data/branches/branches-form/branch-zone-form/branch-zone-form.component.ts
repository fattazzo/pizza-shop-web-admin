import { Component, Input, OnInit } from '@angular/core';
import { BranchDetails, ShippingZone } from 'src/app/open-api';

@Component({
  selector: 'app-branch-zone-form',
  templateUrl: './branch-zone-form.component.html',
  styleUrls: ['./branch-zone-form.component.scss']
})
export class BranchZoneFormComponent implements OnInit {

  @Input() branch: BranchDetails;

  @Input() disabled = true;

  newZone: boolean;
  zone: ShippingZone = { id: null, name: null };
  selectedZone: ShippingZone;

  displayDialog: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onRowSelect(event) {
    this.newZone = false;
    this.zone = this.cloneZone(event.data);
    this.displayDialog = true;
  }

  cloneZone(z: ShippingZone): ShippingZone {
    let zone = { id: null, name: null };
    for (let prop in z) {
      zone[prop] = z[prop];
    }
    return zone;
  }

  showDialogToAdd() {
    this.newZone = true;
    this.zone = { id: null, name: null };
    this.displayDialog = true;
  }

  save() {
    let cars = [...this.branch.shippingZones];
    if (this.newZone)
      cars.push(this.zone);
    else
      cars[this.branch.shippingZones.indexOf(this.selectedZone)] = this.zone;

    this.branch.shippingZones = cars;
    this.zone = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.branch.shippingZones.indexOf(this.selectedZone);
    this.branch.shippingZones = this.branch.shippingZones.filter((val, i) => i != index);
    this.zone = null;
    this.displayDialog = false;
  }

}
