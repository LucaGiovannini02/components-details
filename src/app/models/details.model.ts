export class MyDetails {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public dateInsert: Date,
        public parameters: string,
        public FK: number,
        public notes: string,
    ) {};
}