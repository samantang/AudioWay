export class Choix {
    constructor(
      public id: string,
      public userId: string,
      public resRegionCdd: boolean,
      public resRegionCdi: boolean,
      public audioCdd: boolean,
      public audioCdi: boolean,
      public audioVolant: boolean,
      public assistantAudioCdd: boolean,
      public assistantAudioCdi: boolean,
      public technicienCdd: boolean,
      public technicienCdi: boolean,
      public region: string,
      public departement: string,
      public localite: string,
      public enseignesNon: string [],
      public joursContact: string [],
      public momentsContact: string [],
      public dateCreation: Date,
      public telephone: number
    ) {}
  }