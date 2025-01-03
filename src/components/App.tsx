import { useReducer } from "react";
import { CalculatorResult } from "./calculator_result";
import { MortgageCalculator } from "./mortgage_calculator";
import { StoreActionContext } from "../util/context";
import { mortgegeReducer } from "../store/store";
import "./../styles/global.scss";

export const App: React.FC = () => {
    const [state, dispatch] = useReducer(mortgegeReducer, { mortgageType: "repayment" });

    return (
        <StoreActionContext.Provider value={{ state, dispatch }}>
            <div className="mortgage-container">
                <MortgageCalculator></MortgageCalculator>
                <CalculatorResult></CalculatorResult>
            </div>
        </StoreActionContext.Provider>
    );
};

