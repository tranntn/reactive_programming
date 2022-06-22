import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './comment-drawer.component.html',
  styleUrls: ['./comment-drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closed.emit();
  }

}
