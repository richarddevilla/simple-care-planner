import React from 'react'
import useStyles from './button-clear.style'
import { Button } from '@material-ui/core'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import { clearState} from '../../actions/actionCreators'
import { connect } from 'react-redux'

const ClearButton = ({clearState}) => {
    const classes = useStyles()
    return (
        <Button
            classes={{
                root: classes.siteColor
            }}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<RotateLeftIcon />}
            fullWidth
            onClick={clearState}
        >
            Clear
        </Button>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearState: (state) => { dispatch(clearState()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearButton)
