import { NgClass, NgStyle } from '@angular/common';
import { Component, input, InputSignal, OnChanges, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnChanges {
  rating: InputSignal<number> = input(0);
  stars: WritableSignal<string[]> = signal([]);

  ngOnChanges(): void {
    this.updateStars();
  }

  private updateStars(): void {
    this.stars.set(Array(5).fill('empty'));
    const fullStars = Math.floor(this.rating()); // Number of full stars
    const partialFill = this.rating() - fullStars; // Percentage for the last star

    for (let i = 0; i < fullStars; i++) {
      this.stars()[i] = 'full';
    }

    if (fullStars < 5 && partialFill > 0) {
      this.stars()[fullStars] = `${partialFill * 100}%`;
    }
  }
}
