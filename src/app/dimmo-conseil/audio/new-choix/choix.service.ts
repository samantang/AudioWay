import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';


import { Choix } from './choix.model';
import { Message } from './message.model';

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
    dateCreation: Date;
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

    get Messages (){
      return this._messages.asObservable();
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
                    new Date(resData[key].dateCreation)
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
    }

    addChoix(choix: Choix) {
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
      choix.dateCreation);

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
              choixU.dateCreation
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
  }