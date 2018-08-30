import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

import { AddPlayerComponent } from './add-player/add-player.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterGameComponent } from './enter-game/enter-game.component';
import { GamesTableComponent } from './games-table/games-table.component';
import { PlayersTableComponent } from './players-table/players-table.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'stats/:id',
    component: StatisticsComponent,
  },
  {
    path: 'addPlayer',
    component: AddPlayerComponent,
  },
  {
    path: 'enterGame',
    component: EnterGameComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
  ],
  exports: [RouterModule],
  declarations: [
    AddPlayerComponent,
    StatisticsComponent,
    DashboardComponent,
    PlayersTableComponent,
    GamesTableComponent,
    EnterGameComponent,
    ChartComponent,
  ],
})
export class AppRoutingModule { }
