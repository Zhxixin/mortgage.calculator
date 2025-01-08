import { useState } from "react";
import { MortgageComponentProps } from "../util/types";

export const MortgageTermComponent: React.FC<MortgageComponentProps> = ({ register, errors }) => {
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

        <div className="term-container">
            <div className="title">Mortgage Term</div>
            <div className={`${errors.mortgageTerm && 'error'} ${focusState.mortgageTerm && 'hover'} input-wrapper`}>
                <input {...register("mortgageTerm", { required: true, min: 1, maxLength: 10, valueAsNumber: true, })} type="number" onFocus={() => handleFocus('mortgageTerm')} onBlur={() => handleBlur('mortgageTerm')} />
                <span className={`${errors.mortgageTerm && 'error'} ${focusState.mortgageTerm && 'hover'} unit`}>years</span>
            </div>
            {errors.mortgageTerm && <div className="error">This field is required</div>}
        </div>
    );
};