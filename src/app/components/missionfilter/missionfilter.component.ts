// Import Angular core tools and CommonModule for standalone support
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
  // Output event that notifies the parent component when filters are updated
  @Output() filtersChanged = new EventEmitter<any>();

  // Selected filter values
  selectedYear: number | null = null;
  successfulLaunch: string | null = null;
  successfulLand: string | null = null;

  // Year filter options from 2006 to 2020
  years: number[] = Array.from({ length: 15 }, (_, i) => 2006 + i);

  /**
   * Emit the current filter values to the parent component.
   * Triggered when any filter is selected or changed.
   */
  updateFilters(): void {
    this.filtersChanged.emit({
      launch_year: this.selectedYear,
      launch_success: this.successfulLaunch,
      land_success: this.successfulLand,
    });
  }

  /**
   * Reset all filters and emit an empty object to clear filters in the parent.
   */
  resetFilters(): void {
    this.selectedYear = null;
    this.successfulLaunch = null;
    this.successfulLand = null;
    this.filtersChanged.emit({});
  }
}
