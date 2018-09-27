import { Component, OnInit, Input } from '@angular/core';

export interface options {
  position: string,
  value: string
}

@Component({
  selector: 'app-fab-button',
  template: `
    <div class="container text-center">
      <div class="row">
        <div class="round hollow text-center chat-bot">
          <a id="addClass" [placement]="options.position" [ngbTooltip]="options.value">
            <i class="fa fa-plus"></i>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
  `
    .chat-bot{
      cursor: pointer;
      position: fixed;
      bottom: 20px;
      right: 75px;
      margin-left: 10%;
    }
    .odd-icon{
        font-size: 24px;
        margin-left: 8px;
    }
    .even-icon{
        font-size: 24px;
        margin-right: 8px;
    }
    .round.hollow {
        margin: 40px 0 0;
    }
    .round.hollow a {
        border: 2px solid #ff6701;
        border-radius: 50%;
        color: #ff6701;
        font-size: 40px;
        text-decoration: none;
        padding-left: 10px;
        padding-right: 10px;
        font-family: 'Open Sans', sans-serif;
    }
  `
  ]
})
export class FabButtonComponent implements OnInit {

  @Input() options: options;

  constructor() { }

  ngOnInit() {
    if(!this.options || !this.options.value || !this.options.position){
      throw new Error("Tooltip position and value is required");
    }
  }

}
