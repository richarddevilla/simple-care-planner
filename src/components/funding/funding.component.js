import React from 'react'
import useStyles from './funding.style'
import {
    Grid,
    Paper,
    TextField
} from '@material-ui/core'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded'
import { connect } from 'react-redux'
import { editFunding } from '../../actions/actionCreators'

const Funding = ({fundingMoney, editFunding}) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.paperContainer} >
            <Paper className={classes.paper} elevation={5} >
                <Grid item container spacing={1} alignItems="center" justify='center'>
                    <Grid item>
                        <AttachMoneyRoundedIcon fontSize="large" color='disabled' />
                    </Grid>
                    <Grid item>
                        <TextField
                            type='number'
                            fontSize="large"
                            label="Funding"
                            value={fundingMoney}
                            inputProps={{ min: 0, max: 10000000 }}
                            onChange={(e)=>editFunding(e.target.value)}
                        />
                    </Grid>
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
