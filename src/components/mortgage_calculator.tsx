
import { useForm } from "react-hook-form"
import { calculateMortgage, MortgageDetails, MortgageResult, MortgageType } from "../util/types";
import calculatorIcon from "./../assets/images/icon-calculator.svg";
import { useEffect, useState } from "react";
import { useStoreAction } from "../util/context";
import { MortgageTypeComponent } from "./mortgage_type_component";
import { MortgageTermComponent } from "./mortgage_term_component";
import { MortgageAmountComponent } from "./mortgage_amount_component";
import { InterestRateComponent } from "./interest_rate_component";

export const MortgageCalculator = () => {

    const { state, dispatch } = useStoreAction();
    // const [mortgageType, setMortgageType] = useState<MortgageType>();

    const { register, getValues, handleSubmit, reset, formState: { errors }, } = useForm<MortgageDetails>();



    const onSubmit = handleSubmit((data) => {
        console.log('提交的数据', data);
        if (!data.mortgageType) {
            alert('Please select a mortgage type');
            return;
        }
        const mortgageDetails: MortgageDetails = {
            mortgageAmount: data.mortgageAmount,
            interestRate: data.interestRate,
            mortgageTerm: data.mortgageTerm,
            mortgageType: data.mortgageType
        };

        const result: MortgageResult = calculateMortgage(mortgageDetails);
        dispatch?.call(this, { type: "mortgageResult", payload: { ...result, mortgageType: data.mortgageType } });

    });
    const resetForm = () => {
        // setMortgageType(undefined);

        reset();
        console.log('重置数据', getValues('interestRate'));
        dispatch?.call(this, { type: "reset" });
    }


    // console.log('render MortgageCalculator', getValues());
    return (
        <form onSubmit={onSubmit} className="calculator-container">
            <div className="calculator-title">
                <div className="title">Mortgage Calculator</div>
                <button className="clear-button" onClick={resetForm}>Clear All</button>
            </div>
            <MortgageAmountComponent register={register} errors={errors}></MortgageAmountComponent>

            <div className="input-container">
                <MortgageTermComponent register={register} errors={errors}></MortgageTermComponent>
                <InterestRateComponent register={register} errors={errors}></InterestRateComponent>
            </div>
            <MortgageTypeComponent register={register} errors={errors} getValues={getValues}></MortgageTypeComponent>
            <p></p>
            <button className="submit-button" type="submit" >
                <img src={calculatorIcon} className="submit-icon" alt="calculate repayments" />
                <span>Calculate Repayments</span>
            </button>
        </form>
    );
}