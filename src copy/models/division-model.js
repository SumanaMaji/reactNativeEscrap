export class Division {
  constructor(
    id,
    division,
    divisionName,
    city,
    unit,
    types,
    active,
    createdAt,
  ) {
    this._id = id;
    this.division = division;
    this.divisionName = divisionName;
    this.city = city;
    this.unit = unit;
    this.types = types;
    this.active = active;
    this.createdAt = createdAt;
  }
}
