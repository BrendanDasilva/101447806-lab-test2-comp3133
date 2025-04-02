import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css'],
})
export class MissionfilterComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  selectedYear: number | null = null;
  successfulLaunch: string | null = null;
  successfulLand: string | null = null;

  years: number[] = Array.from({ length: 15 }, (_, i) => 2006 + i);

  updateFilters() {
    this.filtersChanged.emit({
      launch_year: this.selectedYear,
      launch_success: this.successfulLaunch,
      land_success: this.successfulLand,
    });
  }

  resetFilters(): void {
    this.selectedYear = null;
    this.successfulLaunch = null;
    this.successfulLand = null;
    this.filtersChanged.emit({});
  }
}
