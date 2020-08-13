export class CriaNotificacao{
    constructor(
        public turma: string,
        public text: string,
        public titulo: string,
        public date_time: any,
        public idUser: any = 0       
    ){}
}