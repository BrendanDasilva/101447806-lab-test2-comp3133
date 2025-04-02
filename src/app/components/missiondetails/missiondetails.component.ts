import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.interface';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
})
export class MissiondetailsComponent implements OnInit {
  mission!: Launch;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) {}

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('id');
    if (flightNumber) {
      this.spacexService.getMissionDetails(flightNumber).subscribe((data) => {
        this.mission = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
