import { Component, OnInit } from '@angular/core';
import * as html2canvas from "html2canvas";

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss']
})
export class ReportProblemComponent implements OnInit {

  feedBackImage : any;
  constructor() { }

  ngOnInit() {
  }

  // GetCanvas(){
  //   //var self = this;
  //   let options = {
  //     logging : false,
  //   }
  //   html2canvas(document.body, options).then( canvas => {
  //     var image = new Image();
	//     image.src = canvas.toDataURL("image/png");
  //     this.feedBackImage = image.src;
  //     console.log("Canvas : ",canvas.toDataURL);
  //     console.log("Img : ",image);
  //   })
  // }

}
