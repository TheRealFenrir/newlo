import { Component, Input } from '@angular/core';

import { Game } from '../models/game';
import { Player } from '../models/player';

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
})
export class GamesTableComponent {
  @Input() games: Game[] = [];
  @Input() players: Player[] = [];
  readonly displayedColumns = ['gameNum', 'time', 'team1', 'team1Score', 'team2Score', 'team2'];

  getTeam(team: number[]): string {
    let teamString = '';
    team.forEach((id, index) => {
      if (index !== 0) {
        teamString += ', ';
      }
      teamString += this.players.find(player => player.id === id).name;
    });
    return teamString;
  }
}
