import { Component, Input, OnInit } from '@angular/core';
import { FondsService } from '../services/fonds.service';

@Component({
  selector: 'app-fonds',
  templateUrl: './fonds.component.html',
  styleUrls: ['./fonds.component.css']
})
export class FondsComponent implements OnInit {

  @Input() tickerSymbol: string = 'tickerSymbol';
  @Input() devise: string = 'USD';
  @Input() bourse: string = 'XNAS';
  @Input() fondsName: string = 'Nom du fonds';
  @Input() isin: string = 'isin';
  @Input() esg: string = 'false';
  @Input() description: string = '';
  @Input() index: number = 0;



  constructor(private fondsService : FondsService) { }

  ngOnInit(): void {
  }

  getName() {
  return this.fondsName;
  }

  getColor() {
    if(this.esg === 'true') {
      return 'green';
    } else if(this.esg === 'false') {
      return 'red';
    }
    else {
      return 'black';
    }
  }

  onSwitch() {
      if(this.esg === 'true') {
        this.fondsService.unesg(this.fondsService.getFondsByTicker(this.tickerSymbol)!);
      } else if(this.esg === 'false') {
        this.fondsService.esg(this.fondsService.getFondsByTicker(this.tickerSymbol)!);
      }
  }

  onSave(comment: string){
    this.fondsService.saveComment(this.fondsService.getFondsByTicker(this.tickerSymbol)!, comment);
  }

}
