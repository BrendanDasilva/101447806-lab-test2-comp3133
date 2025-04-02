// Angular core and HTTP modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Launch interface model
import { Launch } from '../models/launch.interface';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  // Base URL for the SpaceX API
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all SpaceX launches from the API.
   * @returns Observable<Launch[]> - stream of launch data
   */
  getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.apiUrl);
  }

  /**
   * Fetches filtered launches based on selected criteria.
   * @param params - filters such as launch_year, launch_success, land_success
   * @returns Observable<Launch[]> - filtered launch data
   */
  getFilteredLaunches(params: any): Observable<Launch[]> {
    const query = new URLSearchParams();

    // Append filters if provided
    if (params.launch_year) query.append('launch_year', params.launch_year);
    if (params.launch_success)
      query.append('launch_success', params.launch_success);
    if (params.land_success) query.append('land_success', params.land_success);

    // Construct full query URL
    const url = `${this.apiUrl}?${query.toString()}`;
    return this.http.get<Launch[]>(url);
  }

  /**
   * Fetches detailed information for a specific mission by ID.
   * @param id - the flight_number of the mission
   * @returns Observable<Launch> - detailed mission data
   */
  getMissionDetails(id: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.apiUrl}/${id}`);
  }
}
