export interface IWineCustomer {
  id?: number;
  address?: string;
  phone?: string;
  userLogin?: string;
  userId?: number;
}

export class WineCustomer implements IWineCustomer {
  constructor(public id?: number, public address?: string, public phone?: string, public userLogin?: string, public userId?: number) {}
}
