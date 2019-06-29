import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from '../common/entities/doctor';
import { Patient } from '../common/entities/patient';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hospitality-filter',
  templateUrl: './hospitality-filter.component.html',
  styleUrls: [ './hospitality-filter.component.scss' ]
})
export class HospitalityFilterComponent implements OnInit {

  doctorList: Doctor[];

  patientList: Patient[];

  @Output()
  filterEmitter: EventEmitter<any> = new EventEmitter();

  @Input() set doctors(value: Doctor[]) {
    this.doctorList = value;
    if (this.filterForm) {
      this.filterForm.patchValue({
        doctorControl: value[ 0 ]
      });
    }

  }

  @Input() set patients(value: Patient[]) {
    this.patientList = value;
    if (this.filterForm) {
      this.filterForm.patchValue({
        patientControl: value[ 0 ]
      });
    }
  }

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      doctorControl: [],
      patientControl: [],
      fromDateControl: '',
      toDateControl: ''
    });
  }

  filter() {
    const formValue = this.filterForm.getRawValue();
    this.filterEmitter.emit(formValue);
  }

}
