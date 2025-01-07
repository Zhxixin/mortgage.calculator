
import { useForm } from "react-hook-form"
import { calculateMortgage, MortgageDetails, MortgageResult, MortgageType } from "../util/types";
import calculatorIcon from "./../assets/images/icon-calculator.svg";
import { useEffect, useState } from "react";
import { useStoreAction } from "../util/context";

export const MortgageCalculator = () => {

    const { state, dispatch } = useStoreAction();
    const [mortgageType, setMortgageType] = useState<MortgageType>();

    const { register, getValues, handleSubmit, reset, formState: { errors }, } = useForm<MortgageDetails>();
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({
        mortgageAmount: false,
        mortgageTerm: false,
        interestRate: false,
    });

    const handleFocus = (field: string) => {
        if (focusState[field]) return;
        setFocusState((prev) => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field: string) => {
        if (!focusState[field]) return;
        setFocusState((prev) => ({ ...prev, [field]: false }));
    };



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
                <div className={`${errors.mortgageAmount && 'error'} ${focusState.mortgageAmount && 'hover'} input-wrapper`}>
                    <span className={`${errors.mortgageAmount && 'error'} ${focusState.mortgageAmount && 'hover'} unit`}>£</span>
                    <input {...register("mortgageAmount", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" onFocus={() => handleFocus("mortgageAmount")}
                        onBlur={() => handleBlur("mortgageAmount")} />
                </div>
                {errors.mortgageAmount && <div className="error">This field is required</div>}
            </div>


            <div className="input-container">
                <div className="term-container">
                    <div className="title">Mortgage Term</div>
                    <div className={`${errors.mortgageTerm && 'error'} ${focusState.mortgageTerm && 'hover'} input-wrapper`}>
                        <input {...register("mortgageTerm", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" onFocus={() => handleFocus('mortgageTerm')} onBlur={() => handleBlur('mortgageTerm')} />
                        <span className={`${errors.mortgageTerm && 'error'} ${focusState.mortgageTerm && 'hover'} unit`}>years</span>
                    </div>
                    {errors.mortgageTerm && <div className="error">This field is required</div>}
                </div>
                <div className="rate-container">
                    <div className="title">Interest Rate</div>
                    <div className={`${errors.interestRate && 'error'} ${focusState.interestRate && 'hover'} input-wrapper`}>
                        <input {...register("interestRate", { required: true, min: 0, maxLength: 10, valueAsNumber: true, })} type="number" onFocus={() => handleFocus('interestRate')} onBlur={() => handleBlur('interestRate')} />
                        <span className={`${errors.interestRate && 'error'} ${focusState.interestRate && 'hover'} unit`}>%</span>
                    </div>
                    {errors.interestRate && <div className="error">This field is required</div>}
                </div>
            </div>
            <div className="mortgage-type-container">
                <div className="title">Mortgage Type</div>

                <div className={`${mortgageType == 'repayment' && 'selected'} repayment`}>
                    <label htmlFor="repayment"><input id="repayment" {...register("mortgageType")} type="radio" value='repayment' onChange={() => setMortgageType(() => 'repayment')} />Repayment</label>
                </div>
                <div className={`${mortgageType == 'interestOnly' && 'selected'} interest-only`}>
                    <label htmlFor="interestOnly"><input id="interestOnly" {...register("mortgageType")} type="radio" value='interestOnly' onChange={() => setMortgageType(() => 'interestOnly')} />Interest Only</label>
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