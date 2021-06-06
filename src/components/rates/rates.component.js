import React from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Paper,
    Box,
    TextField,
} from '@material-ui/core'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded'
import useStyles from './rates.styles'
import { editPricing } from '../../actions/actionCreators'

const Rates = ({ currentPrices, editPricing }) => {
    const classes = useStyles();
    const [alert, setAlert] = React.useState({
        'morning': { error: false, message: '' },
        'evening': { error: false, message: '' },
        'night': { error: false, message: '' },
        'saturday': { error: false, message: '' },
        'sunday': { error: false, message: '' },
        'publicHoliday': { error: false, message: '' },
        'custom1': { error: false, message: '' },
        'custom2': { error: false, message: '' },
        'custom3': { error: false, message: '' }
    })

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
        if (e.target.value < 10000 && e.target.value > -10000) {
            editPricing(e.target.id, e.target.value)
            setAlert({ ...alert, [e.target.id]: { error: false, message: '' } })
        } else {
            setAlert({ ...alert, [e.target.id]: { error: true, message: 'Rate should be between -9999 to 9999' } })
        }

    }
    return (
        <Grid item container alignItems='center' justify='center'>
            {rateList.map(day => (
                <Grid item xs={12} md={4} key={day.id}>
                    <Grid item container spacing={1} alignItems="flex-end" justify='center'>
                        <Grid item>
                            <AttachMoneyRoundedIcon fontSize="small" color='disabled' />
                        </Grid>
                        <Box width='75%' m={1}>
                            <Grid item>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={currentPrices[day.id]}
                                    type='number'
                                    id={day.id}
                                    onChange={handlePricingEdit}
                                    fontSize="large"
                                    inputProps={{ min: -9999, max: 9999 }}
                                    label={day.name}
                                    disabled={currentPrices.isFixedPrice && day.id.replace(/[0-9]/, '') !== 'custom' ? true : false}
                                    error={alert[day.id].error}
                                    helperText={alert[day.id].message}
                                    fullWidth
                                />
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            )
            )}
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