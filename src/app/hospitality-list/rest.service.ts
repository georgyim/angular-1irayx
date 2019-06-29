import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospitality } from '../common/entities/hospitality';
import { Doctor } from '../common/entities/doctor';
import { Patient } from '../common/entities/patient';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  public getHospitalies(): Observable<Hospitality[]> {
    return this.http.get<Hospitality[]>('./assets/mock/hospitalies.json');
  }

  public getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('./assets/mock/doctors.json');
  }

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('./assets/mock/patients.json');
  }
}
