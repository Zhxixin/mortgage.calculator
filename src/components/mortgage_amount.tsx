import { useForm } from "react-hook-form";
import { MortgageDetails } from "../util/types";
import { useReducer } from "react";

export const MortgageAmount = () => {
    const {
        register,
        formState: { errors },
    } = useForm<MortgageDetails>();
    // const [state, dispatch] = useReducer(mortgegeReducer, {});

    return (
        <div>
            <label> Mortgage Amount</label>{/* onChange={(e) => dispatch({ type: "amount", payload: e.target.value ?? 0 })}*/}
            <input {...register("mortgageAmount")} />
        </div>
    );
};