import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
// import { Email } from '@teamhive/capacitor-email';


import { Choix } from './choix.model';
import { Message } from './message.model';
import { Opportunite } from '../new-opportunite/Opportunite.model';

interface ChoixData {
   id: string;
   userId: string;
   resRegionCdd: boolean;
   resRegionCdi: boolean;
   audioCdd: boolean;
    audioCdi: boolean;
    audioVolant: boolean;
    assistantAudioCdd: boolean;
    assistantAudioCdi: boolean;
    technicienCdd: boolean;
    technicienCdi: boolean;
    region: string;
    departement: string;
    localite: string;
    enseignesNon: string [];
    joursContact: string [];
    momentsContact: string [];
    dateCreation: Date,
    telephone: number;
}
interface MessagesData {
  id: string;
  nom: string;
  prenom: string;
  sujet: string;
  nousEcrire: string;
  date: Date;
}

interface OpportuniteData {
  id: string,
  userId: string,
  name: string,
  region: string,
  nbOpportunites: number,
  detailsPoste: string,
  dateCreation: Date
}


@Injectable({
    providedIn: 'root'
  })
  export class ChoixService {
    private _choix = new BehaviorSubject<Choix[]>([]);

    get Choix() {
        return this._choix.asObservable();
    }

    private _messages = new BehaviorSubject<Message[]>([]);

    get getMessages (){
      return this._messages.asObservable();
    }

    private _opportunite = new BehaviorSubject<Opportunite[]>([]);

    get Opportunite() {
        return this._opportunite.asObservable();
    }

    constructor(private http: HttpClient) {}

    fetchChoix() {
      return this.http
        .get<{ [key: string]: ChoixData }>(
          'https://dimmo-51817.firebaseio.com/audios.json'
        )
        .pipe(
          map(resData => {
            const choix = [];
            for (const key in resData) {
              if (resData.hasOwnProperty(key)) {
                choix.push(
                  new Choix(
                    key,
                    resData[key].userId,
                    resData[key].resRegionCdd,
                    resData[key].resRegionCdi,
                    resData[key].audioCdd,
                    resData[key].audioCdi,
                    resData[key].audioVolant,
                    resData[key].assistantAudioCdd,
                    resData[key].assistantAudioCdi,
                    resData[key].technicienCdd,
                    resData[key].technicienCdi,
                    resData[key].region,
                    resData[key].departement,
                    resData[key].localite,
                    resData[key].enseignesNon,
                    resData[key].joursContact,
                    resData[key].momentsContact,
                    new Date(resData[key].dateCreation),
                    null
                  )
                );
              }
            }
            return choix;
            // return [];
          }),
          tap(choix => {
            this._choix.next(choix);
            console.log(choix);
          })
        );
    };

    fetchOpportunites() {
      return this.http
        .get<{ [key: string]: OpportuniteData }>(
          'https://dimmo-51817.firebaseio.com/opportunites.json'
        )
        .pipe(
          map(resData => {
            const opportunite = [];
            for (const key in resData) {
              if (resData.hasOwnProperty(key)) {
                opportunite.push(
                  new Opportunite(
                    key,
                    resData[key].userId,
                    resData[key].name,
                    resData[key].region,
                    resData[key].nbOpportunites,
                    resData[key].detailsPoste,
                    new Date(resData[key].dateCreation)
                  )
                );
              }
            }
            return opportunite;
            // return [];
          }),
          tap(Opportunite => {
            this._opportunite.next(Opportunite);
            console.log(Opportunite);
          })
        );
    }

    fetchMessages() {
      console.log('dans fetcheMessages ..... ');
      return this.http
        .get<{ [key: string]: MessagesData }>(
          'https://dimmo-51817.firebaseio.com/messages.json'
        )
        .pipe(
          map(messagesData => {
            const messages = [];
            for (const key in messagesData) {
              if (messagesData.hasOwnProperty(key)) {
                console.log('le sujet de message:  '+  messagesData[key].sujet);
                messages.push(
                  new Message(
                    key,
                    messagesData[key].nom,
                    messagesData[key].prenom,
                    messagesData[key].sujet,
                    messagesData[key].nousEcrire,
                    new Date(messagesData[key].date)
                  )
                );
              }
            }
            // console.log('mess ...' +this.Messages)
            return messages;
            // return [];
          }),
          tap(messages => {
            this._messages.next(messages);
            console.log('messages' +messages);
          })
        );
    }

    addChoix(choix: Choix) {
      console.log(choix.region + ', '+choix.departement + ' ..........................');
      let generatedId: string;
      const newChoix = new Choix(
      Math.random().toString(),
      choix.userId,
      choix.resRegionCdd,
      choix.resRegionCdi,
      choix.audioCdd,
      choix.audioCdi,
      choix.audioVolant,
      choix.assistantAudioCdd,
      choix.assistantAudioCdi,
      choix.technicienCdd,
      choix.technicienCdi,
      choix.region,
      choix.departement,
      choix.localite,
      choix.enseignesNon,
      choix.joursContact,
      choix.momentsContact,
      choix.dateCreation,
      choix.telephone);

      return this.http
      .post<{ name: string }>(
        'https://dimmo-51817.firebaseio.com/audios.json',
        {
          ...newChoix,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this._choix;
        }),
        take(1),
        tap(places => {
          newChoix.id = generatedId;
          this._choix.next(places.concat(newChoix));
        })
      );
      }

      addOpportunite(opportunite: Opportunite) {
        let generatedId: string;
        const newOpportunite = new Opportunite(
        Math.random().toString(),
        opportunite.userId,
        opportunite.name,
        opportunite.region,
        opportunite.nbOpportunites,
        opportunite.detailsPoste,
        opportunite.dateCreation);
  
        return this.http
        .post<{ name: string }>(
          'https://dimmo-51817.firebaseio.com/opportunites.json',
          {
            ...newOpportunite,
            id: null
          }
        )
        .pipe(
          switchMap(resData => {
            generatedId = resData.name;
            return this._opportunite;
          }),
          take(1),
          tap(opportunites => {
            newOpportunite.id = generatedId;
            this._opportunite.next(opportunites.concat(newOpportunite));
          })
        );
        }

      getChoix(id: string) {
        return this.http
          .get<ChoixData>(
            `https://dimmo-51817.firebaseio.com/audios/${id}.json`
          )
          .pipe(
            map(placeData => {
              return new Choix(
                id,
                placeData.userId,
                placeData.resRegionCdd,
                placeData.resRegionCdi,
                placeData.audioCdd,
                placeData.audioCdi,
                placeData.audioVolant,
                placeData.assistantAudioCdd,
                placeData.assistantAudioCdi,
                placeData.resRegionCdd,
                placeData.technicienCdi,
                placeData.region,
                placeData.departement,
                placeData.localite,
                placeData.enseignesNon,
                placeData.joursContact,
                placeData.momentsContact,
                new Date(placeData.dateCreation),
                placeData.telephone
              );
            })
          );
      }
      updateChoix(choixU: Choix) {
        let updatedChoix: Choix[];
        return this.Choix.pipe(
          take(1),
          switchMap(choix => {
            if (!choix || choix.length <= 0) {
              return this.fetchChoix();
            } else {
              return of(choix);
            }
          }),
          switchMap(choix => {
            const updatedChoixIndex = choix.findIndex(ch => ch.id === choixU.id);
            updatedChoix = [...choix];
            const oldChoix = updatedChoix[updatedChoixIndex];
            updatedChoix[updatedChoixIndex] = new Choix(
              choixU.id,
              choixU.userId,
              choixU.resRegionCdd,
              choixU.resRegionCdi,
              choixU.audioCdd,
              choixU.audioCdi,
              choixU.audioVolant,
              choixU.assistantAudioCdd,
              choixU.assistantAudioCdi,
              choixU.technicienCdd,
              choixU.technicienCdi,
              choixU.region,
              choixU.departement,
              choixU.localite,
              choixU.enseignesNon,
              choixU.joursContact,
              choixU.momentsContact,
              choixU.dateCreation,
              choixU.telephone
            );
            return this.http.put(
              `https://dimmo-51817.firebaseio.com/audios/${choixU.id}.json`,
              { ...updatedChoix[updatedChoixIndex], id: null }
            );
          }),
          tap(() => {
            this._choix.next(updatedChoix);
          })
        );
      }
      addMessage(message: Message) {
        let generatedId: string;
        const newMessage = new Message(
        Math.random().toString(),
        message.nom,
        message.prenom,
        message.sujet,
        message.nousEcrire,
        message.date);
  
        return this.http
        .post<{ name: string }>(
          'https://dimmo-51817.firebaseio.com/messages.json',
          {
            ...newMessage,
            id: null
          }
        )
        .pipe(
          switchMap(resData => {
            generatedId = resData.name;
            return this._messages;
          }),
          take(1),
          tap(messages => {
            newMessage.id = generatedId;
            this._messages.next(messages.concat(newMessage));
          })
        );
        }

        deleteChoix(id: string){
          return this.http.delete(`https://dimmo-51817.firebaseio.com/audios/${id}.json`)
        }
  }