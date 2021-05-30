import React from 'react'
import { connect } from 'react-redux'
import { Grid, TextField } from '@material-ui/core'

import { editDate } from '../../actions/actionCreators'
import { dateToCalendar, stringToDate } from '../../utilities/utilities'
import { selectFundedDays } from '../funding-date/funding-date.selector'

const FundingDate = ({ fundingEndDate, fundedDays, fundingStartDate, editDate }) => {
    const [alert, setAlert] = React.useState({ error: false, message: '' })

    const handleStartDateChange = (e) => {
        if (stringToDate(e.target.value) > fundingEndDate) {
            setAlert({
                error:true,
                message:'The start date cannot be later than end date.'
            })
        } else {
            editDate(e.target.name, e.target.value)
            setAlert({
                error:false,
                message:''
            })
        }
    }

    const handleEndDateChange = (e) => {
        if (stringToDate(e.target.value) < fundingStartDate) {
            setAlert({
                error:true,
                message:'The start date cannot be later than end date.'
            })
        } else {
            editDate(e.target.name, e.target.value)
            setAlert({
                error:false,
                message:''
            })
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12} md={4}>
                <Grid item container spacing={1} alignItems="flex-end" justify='center'>
                    <Grid item>
                        <TextField
                            label="Start date"
                            type="date"
                            name='fundingStartDate'
                            value={dateToCalendar(fundingStartDate)}
                            onChange={handleStartDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            error={alert.error}
                            helperText={alert.message}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
                <Grid item container spacing={1} alignItems="flex-end" justify='center'>
                    <Grid item>
                        <TextField
                            label="End date"
                            type="date"
                            name='fundingEndDate'
                            value={dateToCalendar(fundingEndDate)}
                            onChange={handleEndDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            error={alert.error}
                            helperText={alert.message}                            
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid item container spacing={1} alignItems="flex-end" justify='center'>
                    <Grid item>
                        <TextField
                            label="Total Days"
                            type="text"
                            value={fundedDays}
                            disabled
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        fundingStartDate: state.fundingStartDate,
        fundingEndDate: state.fundingEndDate,
        fundedDays: selectFundedDays(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editDate: (dateName, value) => dispatch(editDate(dateName, value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FundingDate)
