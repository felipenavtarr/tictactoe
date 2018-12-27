import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
  turn: string,
  values: string[][],
  
  // punto 1: contador de movimientos
  movements: number,

  // punto 3: flag para registrar si alguien ha ganado
  isVictory: boolean
}

@Injectable({
  providedIn: 'root'
})

export class StateService {

	private _state$: BehaviorSubject<State>;

  constructor() { 

    // se añade al estado inicial el contador de movimientos y el flag de victoria: 
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
    // Se añade la comprobación del flag de victoria, para detener el juego en caso de que haya ganador.
    if(this.state.values[row][col] === '-' && !this.state.isVictory) {
      let newValue = this.state.turn === 'PLAYER X' ? 'X' : '0';
      this.state.values[row][col] = newValue;

      // Incrementa número de movimientos
      this.state.movements++;

      // Comprueba si se gana en esta jugada
      this.state.isVictory = this.checkWinner(newValue);

      // Si se gana, no se cambia el turno. Esto facilita la gestión de la vista de HeaderComponent.
      if(!this.state.isVictory) {
        let newTurn = this.state.turn === 'PLAYER X' ? 'PLAYER 0' : 'PLAYER X';
        this.state.turn = newTurn;
      }

      this._state$.next(this.state);
    }
  }

  /*
    Método para comprobar si el jugador que acaba de mover pieza gana.
    Recibe la pieza (X o 0) que juega en ese turno y comprueba por filas, columnas y las diagonales; si hay tres de esas piezas en línea devuelve true, false en caso contrario.
  */
  checkWinner(value: string) {
    let board = this.state.values;

    // comprobación por filas
    for (let i=0; i<3; i++) {
      if(value === board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return true;
      }
    }

    // Comprobación por columnas
    for (let i=0; i<3; i++) {
      if(value === board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return true;
      }
    }

    // comprobación de las diagonales
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
