class Transaction {
  constructor(
    id,
    division,
    divisionName,
    date,
    typeName,
    subTypeName,
    vechileNo,
    gateInOut,
    partyName,
    ERPRefNo,
    ERPRefDate,
    remark,
    active,
    createdAt,
  ) {
    this.id = id;
    this.division = division;
    this.divisionName = divisionName;
    this.date = date;
    this.typeName = typeName;
    this.subTypeName = subTypeName;
    this.vechileNo = vechileNo;
    this.gateInOut = gateInOut;
    this.partyName = partyName;
    this.ERPRefNo = ERPRefNo;
    this.ERPRefDate = ERPRefDate;
    this.remark = remark;
    this.active = active;
    this.active = createdAt;
  }
}
export default Transaction;
