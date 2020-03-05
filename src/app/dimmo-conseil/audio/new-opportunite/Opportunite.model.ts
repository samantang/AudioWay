export class Opportunite {
    constructor(
      public id: string,
      public userId: string,
      public name: string,
      public region: string,
      public nbOpportunites: number,
      public detailsPoste: string,
      public dateCreation: Date
    ) {}
  }