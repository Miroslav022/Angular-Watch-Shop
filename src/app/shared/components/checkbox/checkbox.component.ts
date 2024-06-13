import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() id: number = 0;
  @Output() filterChange = new EventEmitter<{
    id: number;
    checked: boolean;
  }>();

  onCheckboxChange(event: any): void {
    this.filterChange.emit({ id: this.id, checked: event.target.checked });
  }
}
