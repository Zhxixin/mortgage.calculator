
import { Radio } from "@mui/material";
import * as React from "react"
import { useForm } from "react-hook-form"
import { calculateMortgage, MortgageDetails, MortgageResult } from "../util/types";
import { MortgageAmount } from "./mortgage_amount";
import calculatorIcon from "./../assets/images/icon-calculator.svg";
import { useEffect, useReducer } from "react";
import { MortgageType } from "./mortgage_type";
import { mortgegeReducer } from "../store/store";
import { useStoreAction } from "../util/context";

export const MortgageCalculator = () => {

    const { state, dispatch } = useStoreAction();

    const { register, setValue, getValues, handleSubmit, reset, formState: { errors } } = useForm<MortgageDetails>();

    const onSubmit = handleSubmit((data) => {
        console.log('提交的数据', data);

        const mortgageDetails: MortgageDetails = {
            mortgageAmount: data.mortgageAmount,
            interestRate: data.interestRate,
            mortgageTerm: data.mortgageTerm,
            mortgageType: data.mortgageType
        };

        const result: MortgageResult = calculateMortgage(mortgageDetails);
        dispatch?.call(this, { type: "mortgageResult", payload: { ...result, mortgageType: data.mortgageType ?? "repayment" } });

    });
    const resetForm = () => {
        reset();
        console.log('重置数据', getValues());
        dispatch?.call(this, { type: "reset" });
    }
    useEffect(() => {
        reset({ mortgageType: state?.mortgageType });
    }, []);

    console.log('render MortgageCalculator', state);
    return (
        <form onSubmit={onSubmit}>
            <div className="calculator-title"><span></span>Mortgage Calculator</div>
            <button className="clear-button" onClick={resetForm}>Clear All</button>

            <div className="input-container">
                <label> Mortgage Amount</label>
                <div className="input-wrapper">
                    <span className="amount-icon">£</span>
                    <input {...register("mortgageAmount", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" className="input-field" />
                    {errors.mortgageAmount && <span>MortgageAmoun is required</span>}
                    {/* <input type="text" id="mortgageAmount" name="username" className="input-field"/> */}
                </div>
            </div>

            <div className="input-container">
                <div>
                    <label>Mortgage Term</label>
                    <div className="input-wrapper">
                        <input {...register("mortgageTerm", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" className="input-field" />
                        <span className="term">years</span>
                        {errors.mortgageTerm && <span>MortgageTerm is required</span>}
                    </div>
                </div>
                <div>
                    <label>Interest Rate</label>
                    <div className="input-wrapper">
                        <input {...register("interestRate", { required: true, min: 0, maxLength: 10, valueAsNumber: true, })} type="number" className="input-field" />
                        <span className="rate">%</span>
                        {errors.interestRate && <span>InterestRate is required</span>}
                    </div>
                </div>
            </div>
            <div className="mortgage-type-container">
                <div>Mortgage Type</div>
                <label htmlFor="repayment"><input id="repayment" {...register("mortgageType")} type="radio" value='repayment' />Repayment</label>
                <label htmlFor="interestOnly"><input id="interestOnly" {...register("mortgageType")} type="radio" value='interestOnly' />Interest Only</label>
            </div>
            <p></p>
            <button className="submit-button" type="submit" >
                <img src={calculatorIcon} className="submit-icon" alt="calculate repayments" />
                <span>Calculate Repayments</span>
            </button>
        </form>
    );
}