import { createContext, useContext } from "react";
import { State, Action } from "../store/store";

export const StoreActionContext = createContext<StateActionType>({ state: undefined, dispatch: undefined });


export type StateActionType = {
    state: State | undefined,
    dispatch: React.Dispatch<Action> | undefined
}
export const useStoreAction = () => {
    const context = useContext(StoreActionContext);
    if (context === undefined) {
        throw new Error("useStoreAction must be used within a StoreProvider");
    }
    return context;
};