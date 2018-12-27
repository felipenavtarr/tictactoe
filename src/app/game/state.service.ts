import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
  turn: string,
  values: string[][],
  movements: number,
  isVictory: boolean
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

	private _state$: BehaviorSubject<State>;

  constructor() { 

	  let initialState = {
	    turn: 'PLAYER X',
	    values: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
      ],
      movements: 0,
      isVictory: false
	  };

	  this._state$ = new BehaviorSubject(initialState);
  }

  get state$(): BehaviorSubject<State> {
    return this._state$; 
  }

  get state(): State {
    return this._state$.getValue();
  }

  set state(state: State) {
    this._state$.next(state);
  }
  
  updateValue(row, col) {
    if(this.state.values[row][col] === '-' && !this.state.isVictory) {
      let newValue = this.state.turn === 'PLAYER X' ? 'X' : '0';
      this.state.values[row][col] = newValue;
      this.state.movements++;
      this.state.isVictory = this.checkWinner(newValue);
      if(!this.state.isVictory) {
        let newTurn = this.state.turn === 'PLAYER X' ? 'PLAYER 0' : 'PLAYER X';
        this.state.turn = newTurn;
      }
      this._state$.next(this.state);
    }
  }

  checkWinner(value: string) {
    let board = this.state.values;

    for (let i=0; i<3; i++) {
      if(value === board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return true;
      }
    }

    for (let i=0; i<3; i++) {
      if(value === board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return true;
      }
    }

    if(value === board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return true;
    }

    if(value === board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return true;
    }

    return false;
  }
  
  reset() {
    this.state = {
      turn: 'PLAYER X',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      movements: 0,
      isVictory: false
    };
  }
}
