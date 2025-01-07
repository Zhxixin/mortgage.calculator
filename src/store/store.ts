import { MortgageType } from "../util/types";

export type State = {
    monthlyInterest?: number,
    monthlyPayment?: number,
    totalPayment?: number,
    totalInterest?: number,
    mortgageType?: MortgageType
};
export type Action = { type: "mortgageResult" | "reset"; payload?: State };

export const mortgegeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "mortgageResult":
            return { ...state, ...action.payload };
        case "reset":
            return {};
        default:
            return state;
    }
};