import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GameComponent
  ],
  declarations: [GameComponent, HeaderComponent, BoardComponent, SquareComponent]
})
export class GameModule { }
