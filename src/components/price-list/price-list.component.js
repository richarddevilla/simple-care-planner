import React from 'react'
import { connect } from 'react-redux'
import { Grid, TextField, Paper, MenuItem } from '@material-ui/core'

import useStyles from './price-list.style'
import { pickPricing } from '../../actions/actionCreators'

export const PriceList = ({ priceLists, choosenPriceList, pickPricing }) => {
    const classes = useStyles()

    const handleSelect = (e) => {
            pickPricing(e.target.value, e.target.name)
    }

    return (
                <Grid item container spacing={1} justify='center' alignItems="stretch">
                    <Grid item xs={12} md={5}>
                        <TextField
                            select
                            label="Price List"
                            value={choosenPriceList.id}
                            onChange={handleSelect}
                            fullWidth
                        >
                            {priceLists.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        priceLists: state.priceLists,
        choosenPriceList: state.choosenPriceList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pickPricing: (id, name) => { dispatch(pickPricing(id, name)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceList)
