// Import Angular core and common modules
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import routing utilities to get route parameters and navigate
import { ActivatedRoute, Router } from '@angular/router';

// Import custom service and data interface
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.interface';

// Import Angular Material modules for styling (did not use)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
})
export class MissiondetailsComponent implements OnInit {
  // Holds the selected mission details
  mission!: Launch;

  // Inject required services: router for navigation, route for param access, service for API call
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) {}

  // On component initialization, extract flight number from URL and fetch mission data
  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('id');
    if (flightNumber) {
      this.spacexService.getMissionDetails(flightNumber).subscribe((data) => {
        this.mission = data;
      });
    }
  }

  // Navigate back to the mission list view
  goBack(): void {
    this.router.navigate(['/']);
  }
}
