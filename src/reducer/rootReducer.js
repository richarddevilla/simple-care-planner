import { priceLists } from '../data'
import {
    EDIT_FUNDING,
    PICK_PRICING,
    EDIT_PRICING,
    ADD_VISIT,
    EDIT_VISIT_DAY,
    EDIT_VISIT_TIME,
    EDIT_VISIT_HOUR,
    EDIT_DATE,
    DELETE_VISIT,
    LOAD_STATE,
    CLEAR_STATE
} from '../actions/actionCreators'
import moment from 'moment';
import {stringToDate} from '../utilities/utilities'

let newPriceLists = [];
priceLists.map(item => newPriceLists.push({ ...item, custom1: 0, custom2: 0, custom3: 0, isFixedPrice: true }))
newPriceLists.push({ ...newPriceLists[0], id: 'customPricing', name: 'Custom Pricing', isFixedPrice: false })

let daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
let dayTimeframes = daysOfTheWeek.map(day => ({
    name: day,
    id: day.toLowerCase(),
    timeframe: day !== 'Saturday' && day !== 'Sunday' ? [
        { name: 'Morning', id: 'morning' },
        { name: 'Evening', id: 'evening' },
        { name: 'Night', id: 'night' },
        { name: 'Custom #1', id: 'custom1' },
        { name: 'Custom #2', id: 'custom2' },
        { name: 'Custom #3', id: 'custom3' },
    ] : day === 'Saturday' ? [
        { name: 'All Day', id: 'saturday' },
        { name: 'Custom #1', id: 'custom1' },
        { name: 'Custom #2', id: 'custom2' },
        { name: 'Custom #3', id: 'custom3' },
    ] : [
        { name: 'All Day', id: 'sunday' },
        { name: 'Custom #1', id: 'custom1' },
        { name: 'Custom #2', id: 'custom2' },
        { name: 'Custom #3', id: 'custom3' },
    ]
}
))


const initState = {
    priceLists: newPriceLists,
    fundingMoney: 0,
    fundingStartDate: moment().toDate(),
    fundingEndDate: moment().add(1, 'years').toDate(),
    currentPrices: newPriceLists[0],
    visits: [],
    suggestedWeeklyHour: 0,
    suggestedWeeklyCost: 0,
    weeklyHour: 0,
    weeklyCost: 0,
    totalCost: 0,
    lastVisitID: 0,
    choosenPriceList: {name:newPriceLists[0].name,id:newPriceLists[0].id},
    savedData: ''
};


const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case EDIT_FUNDING:
            return {
                ...state,
                fundingMoney: action.fundingMoney
            }

        case PICK_PRICING:
            return {
                ...state,
                choosenPriceList: {name:action.name, id:action.id},
                currentPrices: state.priceLists.filter(pricing => pricing.id === action.id)[0]
            }

        case EDIT_PRICING:
            return {
                ...state,
                currentPrices: { ...state.currentPrices, [action.id]: action.value },
            }

        case ADD_VISIT:
            return {
                ...state,
                visits: [...state.visits, {
                    days: dayTimeframes,
                    choosenDay: {name:'Monday', id:'monday'},
                    choosenTimeframe: {name:'Morning', id:'morning'},
                    serviceCost: '0',
                    choosenHours: '0',
                    id: state.lastVisitID
                }],
                lastVisitID: state.lastVisitID + 1
            }

        case EDIT_VISIT_DAY:
            const index_d = state.visits.findIndex(visit => visit.id === action.id);
            const newVisits_d = [...state.visits];
            newVisits_d[index_d].choosenDay = action.value
            newVisits_d[index_d].choosenTimeframe = newVisits_d[index_d].days.filter(day => day.id === action.value.id)[0].timeframe[0]
            newVisits_d[index_d].serviceCost = newVisits_d[index_d].choosenHours * state.currentPrices[newVisits_d[index_d].choosenTimeframe]
            return {
                ...state,
                visits: newVisits_d
            }

        case EDIT_VISIT_TIME:
            const index_t = state.visits.findIndex(visit => visit.id === action.id);
            const newVisits_t = [...state.visits];
            newVisits_t[index_t].choosenTimeframe = action.value
            newVisits_t[index_t].serviceCost = newVisits_t[index_t].choosenHours * state.currentPrices[newVisits_t[index_t].choosenTimeframe]
            return {
                ...state,
                visits: newVisits_t
            }

        case EDIT_VISIT_HOUR:
            const index_h = state.visits.findIndex(visit => visit.id === action.id);
            const newVisits_h = [...state.visits];
            newVisits_h[index_h].choosenHours = action.value
            newVisits_h[index_h].serviceCost = newVisits_h[index_h].choosenHours * state.currentPrices[newVisits_h[index_h].choosenTimeframe]
            return {
                ...state,
                visits: newVisits_h
            }

        case EDIT_DATE:
            return {
                ...state,
                [action.dateName]: stringToDate(action.value),
            }

        case LOAD_STATE:
            console.log('LOADING!!!')
            console.log(state)
            return ({
                ...action.state,
            })

        case DELETE_VISIT:
            const newVisits = state.visits.filter(visit => +visit.id !== +action.id);
            return ({
                ...state,
                visits: newVisits
            })

        case CLEAR_STATE:
            console.log('CLEARED!!!')
            return ({...initState})

        default:
            return state;
    }
}

export default rootReducer