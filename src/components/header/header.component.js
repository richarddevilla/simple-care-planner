import React from 'react'
import { Grid, Typography} from '@material-ui/core'
import useStyles from './header.style'

export const Header = (props) => {

    const classes = useStyles();
    return (     
        <Grid item className={classes.title}>
          <Typography variant='h2'>
            Simple Care Planner
          </Typography>
        </Grid>
    )
}

export default Header
