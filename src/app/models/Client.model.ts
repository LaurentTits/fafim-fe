import { AngularDate } from '../models/AngularDate.model';

export class Client {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public birthDate: AngularDate,
    public sexe: number,
    public pub: number,
    public email?: string,//optional
    public phones?: string[] //optional
  ) {}
}
