import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Hospitality } from '../common/entities/hospitality';
import { Patient } from '../common/entities/patient';
import { Doctor } from '../common/entities/doctor';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog-hospitality.component.html',
  styleUrls: [ './modal-dialog-hospitality.component.scss' ]
})
export class ModalDialogHospitalityComponent implements OnInit {

  @Input()
  hospitalityContent: any = '222';

  isOpen: boolean = false;

  doctor: Doctor;

  patient: Patient;

  hospitality: Hospitality;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
  }

  open(doctor: Doctor, patient: Patient, hospitality: Hospitality) {
    this.isOpen = true;
    this.doctor = doctor;
    this.patient = patient;
    this.hospitality = hospitality;
  }

  close(event?: Event) {
    if (!event || !this.elRef.nativeElement.querySelector('.modal-content').contains(event.target)) {
      this.isOpen = false;
      this.doctor = null;
      this.patient = null;
      this.hospitality = null;
    }
  }

}
