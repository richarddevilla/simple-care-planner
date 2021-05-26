import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import useStyles from './button-task.style'
import { addVisit } from '../../actions/actionCreators'

const TaskButton = ({ addVisit }) => {
  const classes = useStyles()
  return (
    <Button
      classes={{
        root: classes.siteColor
      }}
      variant="contained"
      color="primary"
      size="large"
      startIcon={<PlusOneIcon />}
      onClick={addVisit}
      fullWidth
    >
      Task
    </Button>
  )
}

const mapStateToProps = (state) => {
  return {
    visits: state.visits,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addVisit: () => { dispatch(addVisit()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskButton);

