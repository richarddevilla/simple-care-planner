import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import useStyles from './button-container.style'
import LoadButton from '../button-load/button-load.component'
import SaveButton from '../button-save/button-save.component'
import ClearButton from '../button-clear/button-clear.component'
import TaskButton from '../button-task/button-task.component'

const ButtonContainer = () => {
  const classes = useStyles()

  return (

    <Grid item className={classes.paperContainer}>
      <Paper className={classes.paper} elevation={5} >
        <Grid item container spacing={1} alignItems="flex-end" justify='center'>
          <Grid item xs={6} md={3}>
            <TaskButton />
          </Grid>
          <Grid item xs={6} md={3}>
            <SaveButton />
          </Grid>
          <Grid item xs={6} md={3}>
            <LoadButton />
          </Grid>
          <Grid item xs={6} md={3}>
            <ClearButton />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default ButtonContainer
