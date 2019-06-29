import { Component, OnInit, ViewChild } from '@angular/core';
import { Hospitality } from '../common/entities/hospitality';
import { RestService } from './rest.service';
import { SortService } from '../sort/sort.service';
import { SortEvent } from '../sort/sort.component';
import { Doctor } from '../common/entities/doctor';
import { Patient } from '../common/entities/patient';
import { ModalDialogHospitalityComponent } from '../modal-dialog/modal-dialog-hospitality.component';

@Component({
  selector: 'app-hospitality-list',
  templateUrl: './hospitality-list.component.html',
  styleUrls: [ './hospitality-list.component.scss' ]
})
export class HospitalityListComponent implements OnInit {

  hospitalityList: Hospitality[];

  hospitalityListInitial: Hospitality[];

  doctorList: Doctor[];

  patientsList: Patient[];

  @ViewChild('modaDialog', { static: false })
  modaDialog: ModalDialogHospitalityComponent;

  constructor(private restService: RestService, private sortService: SortService) {
  }

  ngOnInit() {
    this.getHospitalies();
    this.getDoctors();
    this.getPatients();
  }

  getHospitalies(): void {
    this.restService.getHospitalies()
      .subscribe((hospitalites: Hospitality[]) => {
        this.hospitalityListInitial = [ ...hospitalites ];
        this.hospitalityList = [ ...hospitalites ];
      });
  }

  getDoctors(): void {
    this.restService.getDoctors()
      .subscribe((doctors: Doctor[]) => this.doctorList = [ ...doctors ]);
  }

  getPatients(): void {
    this.restService.getPatients()
      .subscribe((patients: Patient[]) => this.patientsList = [ ...patients ]);
  }

  sort(value: SortEvent) {
    this.hospitalityList = [ ...this.sortService.orderBy<Hospitality>(this.hospitalityList, value.sortProperty, value.reverse) ];
  }

  openDialog(hospitality: Hospitality) {
    const doctor: Doctor = this.doctorList.find((el: Doctor) => el.id === hospitality.doctorId);
    const patient: Patient = this.patientsList.find((el: Doctor) => el.id === hospitality.patientId);

    this.modaDialog.open(doctor, patient, hospitality);
  }

  filterHanlder(value) {
    let newHospitalityList: Hospitality[];

    // По доктору
    newHospitalityList = value.doctorControl ? this.hospitalityListInitial.filter((el: Hospitality) => {
        return el.doctorId === value.doctorControl.id;
      })
      :
      [ ...this.hospitalityListInitial ];

    // По пациенту
    newHospitalityList = value.patientControl ? newHospitalityList.filter((el: Hospitality) => {
        return el.patientId === value.patientControl.id;
      })
      :
      [ ...newHospitalityList ];

    // По периоду
    newHospitalityList = value.fromDateControl ? newHospitalityList.filter((el: Hospitality) => {
        return new Date(el.date).getTime() >= new Date(value.fromDateControl).getTime();
      })
      :
      [ ...newHospitalityList ];

    newHospitalityList = value.toDateControl ? newHospitalityList.filter((el: Hospitality) => {
        return new Date(el.date).getTime() <= new Date(value.toDateControl).getTime();
      })
      :
      [ ...newHospitalityList ];

    this.hospitalityList = [ ...newHospitalityList ];
  }
}
