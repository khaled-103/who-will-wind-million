export type Answer = {
    id:string,
    text:string
}
export interface Question {
    id:string;
    text: string;
    options: Answer[];
    correctId: string;
}

export interface Lifelines {
    fiftyFifty: {used:boolean,by:string|null,discardedAnswers?: Answer[]};
    audience: {used:boolean,by:string|null};
    phone: {used:boolean,by:string|null};
}
export type AudienceHelpChartOption = { id: string; text: string; percent: number }[];

