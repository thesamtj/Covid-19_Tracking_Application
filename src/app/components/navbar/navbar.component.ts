import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output()
  toggleThemeEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  toggleTheme() {
    this.toggleThemeEvent.emit();
  }
}
