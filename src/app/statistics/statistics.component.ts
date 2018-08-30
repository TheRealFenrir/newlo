import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartPoint } from 'chart.js';
import { Subscription } from 'rxjs';

import { EloService } from '../elo.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit, OnDestroy {

  data: ChartPoint[] = [];
  playerName = '';
  sub: Subscription;

  constructor(private _elo: EloService, private _route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      const playerId = +params['id'];
      const data = [];
      this._elo.getEloHistory(playerId).forEach(entry => {
        data.push({ t: entry.time, y: entry.value });
      });
      // FIXME: optimize to simply retrieve name from id
      this.playerName = this._elo.getCurrentStandings().filter(player => player.id === playerId)[0].name;
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
