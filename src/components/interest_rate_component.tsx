import { useState } from "react";
import { MortgageComponentProps } from "../util/types";

export const InterestRateComponent: React.FC<MortgageComponentProps> = ({ register, errors }) => {
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

    return (
        <div className="rate-container">
            <div className="title">Interest Rate</div>
            <div className={`${errors.interestRate && 'error'} ${focusState.interestRate && 'hover'} input-wrapper`}>
                <input {...register("interestRate", { required: true, min: 0, maxLength: 10, valueAsNumber: true, })} type="number" onFocus={() => handleFocus('interestRate')} onBlur={() => handleBlur('interestRate')} />
                <span className={`${errors.interestRate && 'error'} ${focusState.interestRate && 'hover'} unit`}>%</span>
            </div>
            {errors.interestRate && <div className="error">This field is required</div>}
        </div>
    );
}