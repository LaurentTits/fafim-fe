export class StockData {
  constructor(
    public open: number,
    public high: number,
    public low: number,
    public close: number,
    public volume: number,
    public adj_high:	number,
    public adj_low:	number,
    public adj_close:	number,
    public adj_open:	number,
    public adj_volume:	number,
    public split_factor:	number,
    public symbol:	string,
    public exchange:	string,
    public date:	string
  ) {}
}
