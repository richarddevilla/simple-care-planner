function makeActionCreator(type, ...argNames) {
    return function (...args) {
      const action = { type }
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
      })
      return action
    }
  }
  
  export const EDIT_FUNDING = 'EDIT_FUNDING'
  export const PICK_PRICING = 'PICK_PRICING'
  export const EDIT_PRICING = 'EDIT_PRICING'
  export const ADD_VISIT = 'ADD_VISIT'
  export const EDIT_VISIT_DAY = 'EDIT_VISIT_DAY'
  export const EDIT_VISIT_TIME = 'EDIT_VISIT_TIME'
  export const EDIT_VISIT_HOUR = 'EDIT_VISIT_HOUR'
  export const EDIT_DATE = 'EDIT_DATE'
  export const DELETE_VISIT = 'DELETE_VISIT'
  export const LOAD_STATE = 'LOAD_STATE'
  export const CLEAR_STATE = 'CLEAR_STATE'

  export const clearState = makeActionCreator(CLEAR_STATE)
  export const loadState = makeActionCreator(LOAD_STATE, 'state')
  export const deleteVisit = makeActionCreator(DELETE_VISIT, 'id')
  export const editDate = makeActionCreator(EDIT_DATE, 'dateName', 'value')
  export const editFunding = makeActionCreator(EDIT_FUNDING, 'fundingMoney')
  export const pickPricing = makeActionCreator(PICK_PRICING, 'id','name')
  export const editPricing = makeActionCreator(EDIT_PRICING, 'id','value')
  export const addVisit = makeActionCreator(ADD_VISIT)
  export const editVisitDay = makeActionCreator(EDIT_VISIT_DAY, 'id','value')
  export const editVisitTime = makeActionCreator(EDIT_VISIT_TIME, 'id','value')
  export const editVisitHour = makeActionCreator(EDIT_VISIT_HOUR, 'id','value')