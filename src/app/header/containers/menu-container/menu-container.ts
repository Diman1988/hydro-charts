import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.html',
  styleUrls: ['./menu-container.scss']
})
export class MenuContainerComponent implements OnInit {
  @Input() isOpen$: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

}
