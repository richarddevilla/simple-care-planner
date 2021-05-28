import { createSelector} from 'reselect';

const selectFundingStart = state => state.fundingStartDate
const selectFundingEnd = state => state.fundingEndDate

export const selectFundedDays = createSelector(
    [selectFundingStart, selectFundingEnd],
    (start, end) => ((end - start) / 86400000).toFixed(0)
)