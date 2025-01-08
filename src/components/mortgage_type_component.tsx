import React, { useEffect, useLayoutEffect, useState } from "react";
import { MortgageComponentProps, MortgageDetails, MortgageType } from "../util/types";
import { useStoreAction } from "../util/context";
export const MortgageTypeComponent: React.FC<MortgageComponentProps> = ({ register, errors, getValues }) => {
    const [mortgageType, setMortgageType] = useState<MortgageType>();
    const { state } = useStoreAction();

    useEffect(() => {
        if (getValues != null && getValues("mortgageType") == null && state?.mortgageType != "interestOnly" && state?.mortgageType != "repayment") {
            console.log(' mortgageType null');
            setMortgageType(undefined);
        }
    });


    return (

        <div className="mortgage-type-container">
            <div className="title">Mortgage Type</div>

            <div className={`${mortgageType == 'repayment' && 'selected'} repayment`}>
                <label htmlFor="repayment"> <input id="repayment" {...register("mortgageType", { required: true, })} type="radio" value='repayment' onChange={() => setMortgageType(() => 'repayment')} />Repayment</label>
            </div>
            <div className={`${mortgageType == 'interestOnly' && 'selected'} interest-only`}>
                <label htmlFor="interestOnly"><input id="interestOnly" {...register("mortgageType", { required: true })} type="radio" value='interestOnly' onChange={() => setMortgageType(() => 'interestOnly')} />Interest Only</label>
            </div>
            {errors.mortgageType && <div className="error">This field is required</div>}
        </div>


    );
};