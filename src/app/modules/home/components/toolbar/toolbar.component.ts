import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() openDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();

  emitOpenDrawer(){
    this.openDrawer.emit(true)
  }
}
