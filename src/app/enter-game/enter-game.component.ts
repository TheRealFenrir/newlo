import { Component, OnInit } from '@angular/core';
import { EloService } from '../elo.service';
import { Player } from '../models/player';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

@Component({
  selector: 'app-enter-game',
  templateUrl: './enter-game.component.html',
})
export class EnterGameComponent {
  players: Player[];
  form: FormGroup;
  prediction: [number, number];

  private readonly gameFormValidator: ValidatorFn = (): ValidationErrors => {
    if (!this.form) {
      return {};
    }

    const players: Player[] = [
      this.form.get('t1p1').value,
      this.form.get('t1p2').value,
      this.form.get('t2p1').value,
      this.form.get('t2p2').value
    ];

    const errors: ValidationErrors = {};

    if (!this.playersUnique(players)) {
      errors['unique'] = 'Players are not unique.';
    }

    const t1Score = this.form.get('t1Score').value;
    const t2Score = this.form.get('t2Score').value;
    if (t1Score !== 5 && t2Score !== 5) {
      errors['oneWinner'] = 'One team must have a winning score (5).';
    }

    if (t1Score === t2Score) {
      errors['noTies'] = 'Teams may not have equal scores.';
    }

    return errors;
  }

  constructor(private _elo: EloService, private _fb: FormBuilder) {
    this.players = this._elo.getCurrentStandings();

    this.form = this._fb.group({
      t1p1: [null, [Validators.required]],
      t1p2: [null, [Validators.required]],
      t1Score: [5, [Validators.required, Validators.min(0), Validators.max(5)]],
      t2p1: [null, [Validators.required]],
      t2p2: [null, [Validators.required]],
      t2Score: [5, [Validators.required, Validators.min(0), Validators.max(5)]],
    }, { validator: this.gameFormValidator });
  }

  onSelectionChange(): void {
    const players: Player[] = [
      this.form.get('t1p1').value,
      this.form.get('t1p2').value,
      this.form.get('t2p1').value,
      this.form.get('t2p2').value
    ];

    let predict = true;
    players.forEach(player => {
      if (!player) {
         predict = false;
      }
    });

    if (predict && this.playersUnique(players)) {
      this.prediction = this._elo.predictGame([players[0].id, players[1].id], [players[2].id, players[3].id]);
    } else {
      this.prediction = undefined;
    }
  }

  getMmr(controlName: string): string {
    const val = this.form.get(controlName).value;
    if (!val) { return ''; }
    return val.elo ? 'MMR: ' + val.elo.toString() : '';
  }

  getErrors(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) {
      return '';
    }
    return this.getControlErrors(control);
  }

  getFormErrors(): string {
    if (!this.form) {
      return '';
    }
    return this.getControlErrors(this.form);
  }

  private getControlErrors(control: AbstractControl): string {
    const errors = control.errors;
    if (!errors) {
      return '';
    }

    let errorString = '';
    Object.keys(errors).forEach(key => {
      if (errorString.length !== 0) {
        errorString += '  ';
      }
      switch (key) {
        case 'required':
          errorString += 'Required';
          break;
        case 'max':
          errorString += 'Maximum is ' + errors[key].max.toString();
          break;
        case 'min':
          errorString += 'Minimum is ' + errors[key].min.toString();
          break;
        case 'unique':
        case 'oneWinner':
        case 'noTies':
          errorString += errors[key];
          break;
        default:
          errorString += key + ': ' + JSON.stringify(errors[key]);
      }
    });

    return errorString;
  }

  private playersUnique(players: Player[]): boolean {
    for (let i = 0; i < players.length; ++i) {
      for (let j = i + 1; j < players.length; ++j) {
        if (players[i] && players[j] && players[i].id === players[j].id) {
          return false;
        }
      }
    }
    return true;
  }

}
