export interface IWineCustomer {
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  address?: string;
  phone?: string;
  userId?: number;
}

export class WineCustomer implements IWineCustomer {
  constructor(
    public id?: number, 
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public address?: string, 
    public phone?: string, 
    public userId?: number
    ) 
    {}
}
