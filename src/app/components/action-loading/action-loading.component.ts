import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-action-loading',
  standalone: true,
  imports: [],
  templateUrl: './action-loading.component.html',
  styleUrl: './action-loading.component.scss'
})
export class ActionLoadingComponent {
  loading:InputSignal<boolean> = input<boolean>(false);
}
