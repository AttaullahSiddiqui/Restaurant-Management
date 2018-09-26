import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  template: `
    <div class="container text-center">
      <div class="row">
        <div class="round hollow text-center chat-bot">
          <a href="#" id="addClass">
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

  constructor() { }

  ngOnInit() {
  }

}
