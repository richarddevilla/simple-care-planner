import React from 'react'
import {
    Grid,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    Table,
    TableCell,
    Typography,
    Box
} from '@material-ui/core'
import { connect } from 'react-redux'

import useStyles from '../funding-details/funding-details.style'
import { 
    selectFundedDays,
    selectSuggestWeeklyHours,
    selectSuggestedWeeklyCost,
    selectAllocatedCost,
    selectAllocatedHours,
    selectTotalCost,
    selectTotalHours
} from '../funding-details/funding-details.selector'

const FundingDetails = ({ 
    suggestedWeeklyCost,
    suggestedWeeklyHours,
    currentPrices,
    allocatedHours,
    allocatedCost,
    totalCost,
    totalHours }) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} md={12}>
            <Grid item container spacing={1} direction='column' alignItems="stretch" justify='center'>
                <Grid item>
                    <Typography className={classes.siteColor} variant='h5'><Box pl={4}>Set Up Services</Box></Typography>
                    <TableContainer>
                        <Table  aria-label="simple table" size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="left">Hours</TableCell>
                                    <TableCell align="left">Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Suggested Weekly</TableCell>
                                    <TableCell align="left">{suggestedWeeklyHours}</TableCell>
                                    <TableCell align="left">${suggestedWeeklyCost}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Allocated Weekly</TableCell>
                                    <TableCell align="left">{allocatedHours}</TableCell>
                                    <TableCell align="left">${allocatedCost}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Allocated Total</TableCell>
                                    <TableCell align="left">{totalHours}</TableCell>
                                    <TableCell align="left">${totalCost}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        currentPrices: state.currentPrices,
        fundingStartDate: state.fundingStartDate,
        fundingEndDate: state.fundingEndDate,
        fundingMoney: state.fundingMoney,
        fundedDays: selectFundedDays(state),
        suggestedWeeklyCost: selectSuggestedWeeklyCost(state),
        suggestedWeeklyHours: selectSuggestWeeklyHours(state),
        allocatedHours: selectAllocatedHours(state),
        allocatedCost: selectAllocatedCost(state),
        totalHours: selectTotalHours(state),
        totalCost: selectTotalCost(state)
    }
}

export default connect(mapStateToProps)(FundingDetails)
