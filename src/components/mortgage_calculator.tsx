
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
        <form onSubmit={onSubmit} className="calculator-container">
            <div className="calculator-title">
                <div className="title">Mortgage Calculator</div>
                <button className="clear-button" onClick={resetForm}>Clear All</button>
            </div>

            <div className="amount-container">
                <div className="title"> Mortgage Amount</div>
                <div className={`${errors.mortgageAmount && 'error'} input-wrapper`}>
                    <span className={`${errors.mortgageAmount && 'error'} unit`}>£</span>
                    <input {...register("mortgageAmount", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" />
                    {/* <input type="text" id="mortgageAmount" name="username" className="input-field"/> */}
                </div>
                {errors.mortgageAmount && <div className="error">This field is required</div>}
            </div>


            <div className="input-container">
                <div className="term-container">
                    <div className="title">Mortgage Term</div>
                    <div className={`${errors.mortgageTerm && 'error'} input-wrapper`}>
                        <input {...register("mortgageTerm", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" className={`${errors.mortgageTerm && 'error'} input-field`} />
                        <span className={`${errors.mortgageTerm && 'error'} unit`}>years</span>
                    </div>
                    {errors.mortgageTerm && <div className="error">This field is required</div>}
                </div>
                <div className="rate-container">
                    <div className="title">Interest Rate</div>
                    <div className={`${errors.interestRate && 'error'} input-wrapper`}>
                        <input {...register("interestRate", { required: true, min: 0, maxLength: 10, valueAsNumber: true, })} type="number" className={`${errors.interestRate && 'error'} input-field`} />
                        <span className={`${errors.interestRate && 'error'} unit`}>%</span>
                    </div>
                    {errors.interestRate && <div className="error">This field is required</div>}
                </div>
            </div>
            <div className="mortgage-type-container">
                <div className="title">Mortgage Type</div>

                <div className="repayment">
                    <label htmlFor="repayment"><input id="repayment" {...register("mortgageType")} type="radio" value='repayment' />Repayment</label>
                </div>
                <div className="interestOnly">
                    <label htmlFor="interestOnly"><input id="interestOnly" {...register("mortgageType")} type="radio" value='interestOnly' />Interest Only</label>
                </div>

            </div>
            <p></p>
            <button className="submit-button" type="submit" >
                <img src={calculatorIcon} className="submit-icon" alt="calculate repayments" />
                <span>Calculate Repayments</span>
            </button>
        </form>
    );
}