import type { LifelinesEnum } from "../lib/constant";

export type Answer = {
    id: string,
    text: string
}
export interface Question {
    id: string;
    text: string;
    options: Answer[];
    correctId: string;
}

export interface Lifelines {
    lastUsed: LifeLinesKeys | null,
    helpers: {
        fiftyFifty: { used: boolean, by: string | null, discardedAnswers?: Answer[] };
        audience: { used: boolean, by: string | null };
        phone: { used: boolean, by: string | null };
    }
}
export type AudienceHelpChartOption = { id: string; text: string; percent: number }[];

export type LifeLinesKeys = keyof typeof LifelinesEnum;