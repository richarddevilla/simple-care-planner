import React from 'react'
import useStyles from './funding.style'
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography
} from '@material-ui/core'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded'
import { connect } from 'react-redux'
import { editFunding } from '../../actions/actionCreators'
import FundingDate from '../funding-date/funding-date.component'
const Funding = ({ fundingMoney, editFunding }) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.paperContainer} >
            <Paper className={classes.paper} elevation={5} >
            <Typography className={classes.siteColor} variant='h5'><Box pl={4} mb={2}>Add Funding Details</Box></Typography>
                <Grid item container spacing={1} alignItems="center" justify='center'>
                    <Grid item xs={12} md={12}>
                        <Grid item container spacing={1} alignItems="center" justify='center'>
                                <AttachMoneyRoundedIcon fontSize="large" color='disabled' />
                                <Box width="40%" minWidth='200px' maxWidth='400px' pb={2}>
                                <TextField
                                    type='number'
                                    fontSize="large"
                                    label="Funding"
                                    value={fundingMoney}
                                    inputProps={{ min: 0, max: 10000000 }}
                                    onChange={(e) => editFunding(e.target.value)}
                                    fullWidth
                                />
                                </Box>
                                
                        </Grid>
                    </Grid>
                    <FundingDate />
                </Grid>
            </Paper>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        fundingMoney: state.fundingMoney,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editFunding: fundingMoney => dispatch(editFunding(fundingMoney)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Funding);
