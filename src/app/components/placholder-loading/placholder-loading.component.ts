import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-placholder-loading',
  standalone: true,
  imports: [],
  templateUrl: './placholder-loading.component.html',
  styleUrl: './placholder-loading.component.scss'
})
export class PlacholderLoadingComponent implements OnInit {
  @Input() classInput: string = "col-6 col-sm-6 col-md-4 col-lg-3"
  @Input() numberBoxes: number = 4;
  @Input() styleImage: string = 'min-height: 200px';
  arrLoading: number[] = [];
  ngOnInit(): void {
    for (let i = 0; i < this.numberBoxes; i++) {
      this.arrLoading.push(i)
    }
  }
}
