import { LifelinesEnum } from "../lib/constant";
import type { Answer, Lifelines, LifeLinesKeys } from "../types";
type Action =
    {
        type: LifeLinesKeys,
        payload: {
            by: string,
            discardedAnswers?: Answer[]
        }
    }

export default function lifeLinesReducer(state: Lifelines, action: Action): Lifelines {

    if (action.type === LifelinesEnum.fiftyFifty) {

        return {
            "lastUsed": state.lastUsed,
            helpers: {
                ...state.helpers,
                "fiftyFifty": { used: true, by: action.payload.by, discardedAnswers: action.payload.discardedAnswers || [] }
            }
        }
    } else if (action.type === LifelinesEnum.audience) {
        return {
            "lastUsed": action.type,
            helpers: {
                ...state.helpers,
                "audience": { used: true, by: action.payload.by }
            }
        }
    } else if (action.type === LifelinesEnum.phone) {
        return {
            "lastUsed": action.type,
            helpers: {
                ...state.helpers,
                "phone": { used: true, by: action.payload.by }
            }
        }
    }
    return state;
}