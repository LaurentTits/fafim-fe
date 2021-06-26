import { AngularDate } from '../models/AngularDate.model';

export class OrdreAchat {
  constructor(
    public id: number,
    public horodatage: AngularDate,
    public montant: string,
    public idPortefeuille: number,
    public codeDevise: string,
    public idClient?: number, //facultatif
    public nomPortefeuille?: string //facultatif
  ) {}
}
