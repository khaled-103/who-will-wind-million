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
    fiftyFifty: boolean;
    audience: boolean;
    phone: boolean;
}