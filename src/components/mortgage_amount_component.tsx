import { useState } from "react";
import { MortgageComponentProps } from "../util/types";

export const MortgageAmountComponent: React.FC<MortgageComponentProps> = ({ register, errors }) => {
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
        <div className="amount-container">
            <div className="title"> Mortgage Amount</div>
            <div className={`${errors.mortgageAmount && 'error'} ${focusState.mortgageAmount && 'hover'} input-wrapper`}>
                <span className={`${errors.mortgageAmount && 'error'} ${focusState.mortgageAmount && 'hover'} unit`}>£</span>
                <input {...register("mortgageAmount", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" onFocus={() => handleFocus("mortgageAmount")}
                    onBlur={() => handleBlur("mortgageAmount")} />
            </div>
            {errors.mortgageAmount && <div className="error">This field is required</div>}
        </div>
    );
};