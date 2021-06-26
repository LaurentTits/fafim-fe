import { Subject } from 'rxjs';
import { Cotation } from '../models/Cotation.model';

export class FondsLocalService {

  fondsLocalSubject = new Subject<Cotation[]>();

  private fondsValues : Cotation[] = [];
  /** [
    {
        "pagination": {
            "limit": 100,
            "offset": 0,
            "count": 100,
            "total": 9944
        },
        "data": [
            {
                "open": 129.8,
                "high": 133.04,
                "low": 129.47,
                "close": 132.995,
                "volume": 106686703.0,
                "adj_high": 133.04,
                "adj_low": 129.47,
                "adj_close": 132.995,
                "adj_open": 129.8,
                "adj_volume": 106686703.0,
                "split_factor": 1.0,
                "symbol": "AAPL",
                "exchange": "XNAS",
                "date": "2021-04-09T00:00:00+0000"
                }
        ]
    }
  ]; */

  emitFondsLocalSubject() {
    this.fondsLocalSubject.next(this.fondsValues.slice());
  }



}
