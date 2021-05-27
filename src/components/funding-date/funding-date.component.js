import React from 'react'
import { connect } from 'react-redux'
import { Grid, TextField } from '@material-ui/core'
import { editDate } from '../../actions/actionCreators'
import { dateToCalendar } from '../../utilities/utilities'
const FundingDate = ({ fundingEndDate, fundedDays, fundingStartDate, editDate }) => {
    const handleDateChange = (e) => {
         editDate(e.target.name, e.target.value)
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
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
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
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
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
        fundedDays: ((state.fundingEndDate - state.fundingStartDate) / 86400000).toFixed(0)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editDate: (dateName, value) => dispatch(editDate(dateName, value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FundingDate)
