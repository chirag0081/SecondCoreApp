import { Component, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-stock-average',
  templateUrl: './stock-average.component.html',
  styleUrls: ['./stock-average.component.css']
})
export class StockAverageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  SaveDate(formData: any) {
    console.log(formData);
  }

}
