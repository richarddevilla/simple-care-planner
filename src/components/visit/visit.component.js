import React from 'react'
import { Grid, Paper, TextField, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useStyles from './visit.style'
import { connect } from 'react-redux'
import { editVisitDay, editVisitHour, editVisitTime, deleteVisit } from '../../actions/actionCreators'

const Visit = ({ visits, currentPrices, editVisitDay, editVisitHour, editVisitTime, deleteVisit }) => {
  const classes = useStyles()
  return (
    <Grid item className={classes.paperContainer} >
      <Paper className={classes.paper} elevation={5} >
        {visits.map(visit =>
          <Paper className={classes.paper} elevation={5} key={visit.id}>
            <Grid item container spacing={1} alignItems="center" justify='center' direction='row'>

              <Grid item xs={6} md={3}>
                <Autocomplete
                  options={visit.days}
                  getOptionLabel={(option) => option.name}
                  value={visit.choosenDay}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(_, e) => e != null ? editVisitDay(visit.id, { id: e.id, name: e.name }) : visit.choosenDay }
                  autoComplete
                  includeInputInList
                  renderInput={(params) => <TextField {...params} label="Day" margin="normal" />}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <Autocomplete
                  options={visit.days.filter(day => day.id === visit.choosenDay.id)[0].timeframe}
                  getOptionLabel={(option) => option.name}
                  value={visit.choosenTimeframe}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(_, e) => e != null ? editVisitTime(visit.id, { id: e.id, name: e.name }) : visit.choosenTimeframe}
                  autoComplete
                  includeInputInList
                  renderInput={(params) => <TextField {...params} label="Time" margin="normal" />}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  label="Hour/s"
                  type="number"
                  margin='normal'
                  value={visit.choosenHours}
                  onChange={(e) => editVisitHour(visit.id, e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: 0, max: 24 }}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  label="Cost"
                  type="text"
                  margin='normal'
                  value={(visit.choosenHours * currentPrices[visit.choosenTimeframe.id]).toFixed(2)}
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={3} md={2}>

                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={(e) => deleteVisit(visit.id)}
                >
                  X
              </Button>
              </Grid>
            </Grid>
          </Paper>
        )
        }

      </Paper>
    </Grid>
  )
}
const mapStateToProps = (state) => {
  return {
    visits: state.visits,
    currentPrices: state.currentPrices
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editVisitDay: (id, value) => { dispatch(editVisitDay(id, value)) },
    editVisitTime: (id, value) => { dispatch(editVisitTime(id, value)) },
    editVisitHour: (id, value) => { dispatch(editVisitHour(id, value)) },
    deleteVisit: (id) => { dispatch(deleteVisit(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Visit);