export class Message {
    constructor(
        public id: string,
        public nom: string,
        public prenom: string,
        public sujet: string,
        public nousEcrire: string,
        public date: Date
    ){}
}