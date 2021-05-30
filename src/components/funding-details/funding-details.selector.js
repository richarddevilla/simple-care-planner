import { createSelector } from 'reselect';

const selectFundingStart = state => state.fundingStartDate
const selectFundingEnd = state => state.fundingEndDate
const selectFundingMoney = state => state.fundingMoney
const selectVisits = state => state.visits
const selectCurrentPrices = state => state.currentPrices


export const selectFundedDays = createSelector(
    [selectFundingStart, selectFundingEnd],
    (start, end) => ((end - start) / 86400000).toFixed(0)
)

export const selectSuggestedWeeklyCost = createSelector(
    [selectFundingStart, selectFundingEnd, selectFundingMoney],
    (start, end, money) => (
        (money / ((end - start) / 8640000)).toFixed(2)
    )
)

export const selectSuggestWeeklyHours = createSelector(
    [selectSuggestedWeeklyCost, selectCurrentPrices],
    (weeklyCost, prices) => (weeklyCost / prices.morning).toFixed(2)
)

export const selectAllocatedCost = createSelector(
    [selectVisits, selectCurrentPrices],
    (visits, prices) => (visits.reduce((totalCost, visit) =>
        totalCost + (+visit.choosenHours *
            prices[visit.choosenTimeframe.id]), 0))
        .toFixed(2)
)

export const selectAllocatedHours = createSelector(
    [selectVisits],
    (visits) => visits.reduce(
        (totalHour, visit) => totalHour + +visit.choosenHours, 0)
        .toFixed(2)
)

export const selectTotalCost = createSelector(
    [selectVisits, selectCurrentPrices, selectFundedDays],
    (visits, prices, fundedDays) => (
        ((visits.reduce((totalCost, visit) =>
            totalCost +
            (+visit.choosenHours * prices[visit.choosenTimeframe.id]), 0)) *
            fundedDays
        ).toFixed(2)
    )
)

export const selectTotalHours = createSelector(
    [selectVisits, selectFundedDays],
    (visits, fundedDays) =>
        (visits.reduce((totalHour, visit) =>
            totalHour + +visit.choosenHours, 0) *
            fundedDays
        ).toFixed(2)
)