import { useReducer } from "react";
import { CalculatorResult } from "./calculator_result";
import { MortgageCalculator } from "./mortgage_calculator";
import { StoreActionContext } from "../util/context";
import { mortgegeReducer } from "../store/store";

export const App: React.FC = () => {
    const [state, dispatch] = useReducer(mortgegeReducer, { mortgageType: "repayment" });

    return (
        <StoreActionContext.Provider value={{ state, dispatch }}>
            <MortgageCalculator></MortgageCalculator>
            <CalculatorResult></CalculatorResult>
        </StoreActionContext.Provider>
    );
};

