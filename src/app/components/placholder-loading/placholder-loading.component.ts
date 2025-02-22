import { Component, input, Input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-placholder-loading',
  standalone: true,
  imports: [],
  templateUrl: './placholder-loading.component.html',
  styleUrl: './placholder-loading.component.scss'
})
export class PlacholderLoadingComponent implements OnInit {
  classInput: InputSignal<string> = input("col-6 col-sm-6 col-md-4 col-lg-3");
  numberBoxes: InputSignal<number> = input(4);
  styleImage: InputSignal<string> = input("min-height: 200px");
  arrLoading: WritableSignal<number[]> = signal([]);


  ngOnInit(): void {
    for (let i = 0; i < this.numberBoxes(); i++) {
      this.arrLoading().push(i);
    }
  }
}
