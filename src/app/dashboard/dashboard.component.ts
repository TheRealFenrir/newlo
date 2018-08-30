import { Component, OnInit } from '@angular/core';
import { EloService } from '../elo.service';
import { Player } from '../models/player';
import { Game } from '../models/game';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  standings: Player[] = [];
  games: Game[] = [];

  readonly displayedColumns = ['id', 'name', 'elo'];

  constructor(private _elo: EloService) { }

  ngOnInit() {
    this.standings = this._elo.getCurrentStandings();
    this.games = this._elo.getGameHistory();
  }

}
