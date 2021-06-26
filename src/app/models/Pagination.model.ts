export class Pagination {
  constructor(
    public limit: number,
    public offset: number,
    public count: number,
    public total: number
  ) {}
}
