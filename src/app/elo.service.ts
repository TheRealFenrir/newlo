import { Injectable } from '@angular/core';

import { Elo } from './models/elo';
import { Game } from './models/game';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class EloService {

  simulated = false;

  private simulatedGames: Game[] = [
    { team1: [0, 1], team2: [2, 3], team1Score: 5, team2Score: 3, time: new Date(0) },
    { team1: [0, 2], team2: [3, 1], team1Score: 5, team2Score: 3, time: new Date(1) },
    { team1: [0, 3], team2: [2, 1], team1Score: 5, team2Score: 3, time: new Date(2) },
  ];

  private simulatedElo: Elo[] = [
    {playerId: 0, value: 1450, time: new Date(0)},
    {playerId: 1, value: 1450, time: new Date(0)},
    {playerId: 2, value: 1350, time: new Date(0)},
    {playerId: 3, value: 1350, time: new Date(0)},
    {playerId: 0, value: 1500, time: new Date(1)},
    {playerId: 1, value: 1400, time: new Date(1)},
    {playerId: 2, value: 1400, time: new Date(1)},
    {playerId: 3, value: 1300, time: new Date(1)},
    {playerId: 0, value: 1550, time: new Date(2)},
    {playerId: 1, value: 1350, time: new Date(2)},
    {playerId: 2, value: 1350, time: new Date(2)},
    {playerId: 3, value: 1350, time: new Date(2)},
  ];

  private simulatedPlayers: Player[] = [
    { id: 0, name: 'Jake Coddington', elo: 1550 },
    { id: 1, name: 'Micah Russell', elo: 1350 },
    { id: 2, name: 'Kevin O\'Connor', elo: 1350 },
    { id: 3, name: 'Hippo Hugh', elo: 1350 },
  ];

  constructor() {
  }

  getGameHistory(): Game[] {
    return this.simulated ? this.getGameHistoryFrom() : this.simulatedGames;
  }

  getEloHistory(player: number): Elo[] {
    return this.simulated ? this.getEloHistoryFrom(player) : this.simulatedElo.filter(value => value.playerId === player);
  }

  getCurrentStandings(): Player[] {
    return this.simulated ? this.getCurrentStandingsFrom() : this.simulatedPlayers;
  }

  enterGame(game: Game): void {
    if (this.simulated) {
      console.warn('Game Entered');
    } else {
      this.enterGameTo(game);
    }
  }

  addPlayer(name: string): void {
    if (this.simulated) {
      console.warn('Player Added:', name);
    } else {
      this.addPlayerTo(name);
    }
  }

  predictGame(team1: number[], team2: number[]): [number, number] {
    if (this.simulated) {
      console.warn('Game Predicted');
      return [5, 3];
    } else {
      return this.predictGameFrom();
    }
  }

  private getGameHistoryFrom(): Game[] {
    // TODO:
    return [];
  }

  private getEloHistoryFrom(player: number): Elo[] {
    // TODO:
    return [];
  }

  private getCurrentStandingsFrom(): Player[] {
    // TODO:
    return [];
  }

  private predictGameFrom(): [number, number] {
    // TODO:
     return [0, 0];
  }

  private enterGameTo(game: Game): void {
    // TODO:
  }

  private addPlayerTo(name: string): void {
    // TODO:
  }

}
