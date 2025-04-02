import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllLaunches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredLaunches(params: any): Observable<any[]> {
    const query = new URLSearchParams();

    if (params.launch_year) query.append('launch_year', params.launch_year);
    if (params.launch_success)
      query.append('launch_success', params.launch_success);
    if (params.land_success) query.append('land_success', params.land_success);

    const url = `${this.apiUrl}?${query.toString()}`;
    return this.http.get<any[]>(url);
  }

  getMissionDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
