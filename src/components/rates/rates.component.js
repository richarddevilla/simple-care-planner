import React from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Paper,
    TextField,
} from '@material-ui/core'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded'
import useStyles from './rates.styles'
import { editPricing } from '../../actions/actionCreators'

const Rates = ({ currentPrices, editPricing }) => {
    const classes = useStyles();

    const rateList = [
        { name: 'Morning', id: 'morning' },
        { name: 'Evening', id: 'evening' },
        { name: 'Night', id: 'night' },
        { name: 'Saturday', id: 'saturday' },
        { name: 'Sunday', id: 'sunday' },
        { name: 'Public Holiday', id: 'publicHoliday' },
        { name: 'Custom #1', id: 'custom1' },
        { name: 'Custom #2', id: 'custom2' },
        { name: 'Custom #3', id: 'custom3' },
    ]
    const handlePricingEdit = (e) => {
        editPricing(e.target.id, e.target.value)
    }
    return (
        <Grid item className={classes.paperContainer}>
            <Paper className={classes.paper} elevation={5} >
                <Grid item container alignItems='center' justify='center'>

                    {rateList.map(day => (
                        <Grid item xs={12} md={4} key={day.id}>
                            <Grid item container spacing={1} alignItems="flex-end" justify='center'>
                                <Grid item>
                                    <AttachMoneyRoundedIcon fontSize="small" color='disabled' />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        value={currentPrices[day.id]}
                                        type='number'
                                        id={day.id}
                                        onChange={handlePricingEdit}
                                        fontSize="large"
                                        inputProps={{ min: 0, max: 1000 }}
                                        label={day.name}
                                        disabled={currentPrices.isFixedPrice && day.id.replace(/[0-9]/, '') !== 'custom' ? true : false}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                    )}


                </Grid>
            </Paper>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        currentPrices: state.currentPrices,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPricing: (id, value) => { dispatch(editPricing(id, value)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Rates)