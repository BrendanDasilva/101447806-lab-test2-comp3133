import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.interface';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.apiUrl);
  }

  getFilteredLaunches(params: any): Observable<Launch[]> {
    const query = new URLSearchParams();

    if (params.launch_year) query.append('launch_year', params.launch_year);
    if (params.launch_success)
      query.append('launch_success', params.launch_success);
    if (params.land_success) query.append('land_success', params.land_success);

    const url = `${this.apiUrl}?${query.toString()}`;
    return this.http.get<Launch[]>(url);
  }

  getMissionDetails(id: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.apiUrl}/${id}`);
  }
}
