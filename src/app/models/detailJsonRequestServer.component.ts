export class detailJsonRequestServer {
    constructor(
        public id: number,
        public parameter: string,
        public description: string,
        public value: number,
        public dateEntry: string,
        public fk: number,
        public note: string,
    ) {}
  }