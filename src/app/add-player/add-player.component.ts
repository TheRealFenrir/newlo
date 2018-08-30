import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { EloService } from '../elo.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
})
export class AddPlayerComponent {
  options: FormGroup;

  constructor(private _elo: EloService, private _fb: FormBuilder) {
    this.options = _fb.group({
      playerName: ['', Validators.required],
    });

  }

  onClick(): void {
    this._elo.addPlayer(this.options.get('playerName').value);
    this.options.get('playerName').setValue('');
  }

}
