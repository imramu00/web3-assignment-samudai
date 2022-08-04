import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configureStore';

interface userDetails {
    accountId?: string | undefined;
}

const initialState: userDetails = {
    accountId: undefined,
};

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserAccount: (state, action: PayloadAction<string>) => {
            state.accountId = action.payload;
        },
        removeUserAccount: (state) => {
            state.accountId = undefined;
        },
    },
});

export const { setUserAccount, removeUserAccount } = userDetailsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.userDetails.accountId;
export const userDetails = createSelector(
    (state: RootState) => state.userDetails.accountId,
    (accountId) => accountId
);

const { reducer } = userDetailsSlice;
export default reducer;
