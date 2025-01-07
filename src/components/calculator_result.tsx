
import { useReducer } from "react";
import illustrationIcon from "./../assets/images/illustration-empty.svg";
import { mortgegeReducer } from "../store/store";
import { Card } from "@mui/material";
import { useStoreAction } from "../util/context";
import { numFormat } from "../util/types";
export const CalculatorResult = () => {

    const { state } = useStoreAction();

    // console.log('render CalculatorResult', state);

    return (
        <div className="calculator-result-container">

            {state?.monthlyPayment === undefined || state?.monthlyPayment == null ?
                <>
                    <img className="illustration-image" src={illustrationIcon} alt="mortgage amount" />
                    <h2>Results shown here</h2>
                    <div className="remark">Complete the form and click “calculate repayments” to see what
                        your monthly repayments would be.</div>
                </>
                : <>
                    <h2 className="result-title">Your results</h2>
                    <div className="remark">  Your results are shown below based on the information you provided.
                        To adjust the results, edit the form and click “calculate repayments” again.</div>
                    <Card className="result-card">
                        <div className="monthly-repayments"> Your monthly repayments</div>
                        <div className="mortgage-pay"> {state.mortgageType === 'interestOnly' ? `${numFormat(state.monthlyInterest)}` : `${numFormat(state.monthlyPayment)}`}</div>
                        <hr className="divider" />
                        <div className="tip"> Total you'll repay over the term</div>
                        <div className="mortgage-result">{state.mortgageType === 'interestOnly' ? `${numFormat(state.totalInterest)}` : `${numFormat(state.totalPayment)}`}</div>
                    </Card>
                </>}

        </div>
    );
};