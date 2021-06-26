import { AngularDate } from '../models/AngularDate.model';

export class Cotation {
  constructor(
    public id: number,
    public date: AngularDate,
    public open: number,
    public close: number,
    public low: number,
    public high: number,
    public volume: string,
    public symbol: string
  ) {}
}
