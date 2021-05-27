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
import useStyles from '../funding-details/funding-details.style'
import { connect } from 'react-redux'

const FundingDetails = ({ suggestedWeeklyCost,
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
                                    <TableCell align="left">{(suggestedWeeklyCost / currentPrices.morning).toFixed(2)}</TableCell>
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
        fundedDays: ((state.fundingEndDate - state.fundingStartDate) / 86400000).toFixed(0),
        suggestedWeeklyCost: (state.fundingMoney /
            ((state.fundingEndDate - state.fundingStartDate) /
                86400000) * 7).toFixed(2),
        allocatedHours: (state.visits.reduce((totalHour, visit) => totalHour + +visit.choosenHours, 0)).toFixed(2),
        allocatedCost: (state.visits.reduce((totalCost, visit) => totalCost + (+visit.choosenHours * state.currentPrices[visit.choosenTimeframe.id]), 0)).toFixed(2),
        totalHours: (state.visits.reduce((totalHour, visit) => totalHour + +visit.choosenHours, 0) * ((state.fundingEndDate - state.fundingStartDate) / 86400000 / 7)).toFixed(2),
        totalCost: ((state.visits.reduce((totalCost, visit) => totalCost + (+visit.choosenHours * state.currentPrices[visit.choosenTimeframe.id]), 0)) * ((state.fundingEndDate - state.fundingStartDate) / 86400000 / 7)).toFixed(2)
    }
}

export default connect(mapStateToProps)(FundingDetails)
