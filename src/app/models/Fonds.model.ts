import { FondsLocal } from '../models/FondsLocal.model';

export class Fonds {
  constructor(
    public isin: string,
    public name: string,
    public esg: string,
    public description: string,
    public fondsLocaux: FondsLocal[]
  ) {}
}
