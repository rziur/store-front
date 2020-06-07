export interface IWineStore {
  id?: number;
  name?: string;
  description?: string;
  rating?: number;
}

export class WineStore implements IWineStore {
  constructor(public id?: number, public name?: string, public description?: string, public rating?: number) {}
}
