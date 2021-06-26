import { Component, OnInit } from '@angular/core';
import { FondsService } from '../services/fonds.service';
import { ActivatedRoute } from '@angular/router';
import { FondsLocalService } from '../services/fonds-local.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-fonds',
  templateUrl: './single-fonds.component.html',
  styleUrls: ['./single-fonds.component.css']
})
export class SingleFondsComponent implements OnInit {
  tickerSymbol: string ='ticker';
  devise: string = 'USD';
  bourse: string = 'XNAS';
  isin: string = '';
  name: string = 'Fonds';
  esg: string = 'false';

  constructor(private fondsService: FondsService,
              private route: ActivatedRoute) { }

  ngOnInit() {

      const ticker = this.route.snapshot.params['tickerSymbol'];

      this.tickerSymbol = this.fondsService.getFondsByTicker(ticker)!.tickerSymbol;
      this.devise = this.fondsService.getFondsByTicker(ticker)!.devise;
      this.bourse = this.fondsService.getFondsByTicker(ticker)!.bourse;
      this.isin = this.fondsService.getFondsByTicker(ticker)!.isin;
      this.name = this.fondsService.getFondsByTicker(ticker)!.nom; //exclamation mark coerces that getFondsByIsin is not undefined
      this.esg = this.fondsService.getFondsByTicker(ticker)!.esg;


  }
}
