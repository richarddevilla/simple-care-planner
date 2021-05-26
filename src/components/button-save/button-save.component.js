import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './button-save.style'
import SaveIcon from '@material-ui/icons/Save'
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { storeState, auth } from '../../firebase/firebase.utils';
import {connect} from 'react-redux'

const SaveButton = ({state}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [saveName, setSaveName] = React.useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setSaveName(e.target.value)
    }
    
    const handleSave = async () => {
        if (saveName !== '') {
            const additionalData = { ...state, name: saveName};
            const user = auth.currentUser

            await storeState(user, additionalData)
            setSaveName('')
            setOpen(false)
        } else {
        }
    }

    return (
        <React.Fragment>
            <Button
                classes={{
                    root: classes.siteColor
                }}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleClickOpen}
                fullWidth
            >
                Save
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Save</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Save Name"
                        name='saveName'
                        value={saveName}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant='outlined'>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(SaveButton)
