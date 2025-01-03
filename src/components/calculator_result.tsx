
import { useReducer } from "react";
import illustrationIcon from "./../assets/images/illustration-empty.svg";
import { mortgegeReducer } from "../store/store";
import { Card } from "@mui/material";
import { useStoreAction } from "../util/context";
export const CalculatorResult = () => {

    const { state } = useStoreAction();

    console.log('render CalculatorResult', state);
    return (
        <div className="calculator-result-container">
            <div className="calculator-result">
                {state?.monthlyPayment === undefined || state?.monthlyPayment == null ?
                    <div>
                        <img className="illustration-image" src={illustrationIcon} alt="mortgage amount" />
                        <h1>Results shown here</h1>
                        <div className="remark">Complete the form and click “calculate repayments” to see what
                            your monthly repayments would be.</div>
                    </div>
                    : <div>
                        <h1>Your results</h1>
                        <div className="remark">  Your results are shown below based on the information you provided.
                            To adjust the results, edit the form and click “calculate repayments” again.</div>
                        <Card>
                            <div> Your monthly repayments</div>
                            <div> {state.mortgageType === 'interestOnly' ? state.monthlyInterest : state.monthlyPayment}</div>
                            {/* <border></border> */}
                            <div> Total you'll repay over the term</div>
                            <div>{state.mortgageType === 'interestOnly' ? state.totalPayment : state.totalInterest}</div>
                        </Card>
                    </div>}
                <div>

                </div>
            </div>
        </div>
    );
};