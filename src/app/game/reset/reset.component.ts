import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  private _stateService: StateService;

  constructor(stateService: StateService) { 
    this._stateService = stateService;
  }

  ngOnInit() {
  }

  _handleResetClick() {
    console.log("Restart clicked");
    this._stateService.reset();
  }

}
