import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../models/player';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
})
export class PlayersTableComponent {
  @Input() players: Player[] = [];
  readonly displayedColumns = ['rank', 'name', 'elo', 'stats'];

  constructor(private _r: Router) { }

  onClick(id: number): void {
    this._r.navigate(['stats', id]);
  }
}
