import React from 'react'
import { Button, MenuItem } from '@material-ui/core'
import useStyles from './button-load.style'
import GetAppIcon from '@material-ui/icons/GetApp'
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { loadState, auth, firestore } from '../../firebase/firebase.utils';
import { loadState as loadStateAction } from '../../actions/actionCreators';


import { connect } from 'react-redux'

const LoadButton = ({ loadStateAction }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState('');
    const [dataList, setDataList] = React.useState([])
    const [alert, setAlert] = React.useState({ error: false, message: '', severity: 'info' });

    const handleAlertClose = (event, reason) => {
        setAlert({ ...alert,error: false}, setAlert({...alert, message:'', severity:'info'}));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLoadData = async event => {
        const newState = await loadState(auth.currentUser, { name: data })
        loadStateAction(newState)
        setOpen(false);
    }

    const handleRetrieveSavedData = async event => {
        // retrieve a collection
        if (auth.currentUser != null) {
            const data = await firestore.collection('state').where('user', '==', auth.currentUser.uid).get();
            const tempData = []
            data.docs.map(doc =>
                tempData.push(doc.data().payload.name)
            )
            setDataList(tempData)
            setOpen(true);
        } else {
            setAlert({ error: true, message: 'Please login to load your data', severity: 'error' });
        }

    }

    const handleChange = (e) => {
        setData(e.target.value)

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
                onClick={handleRetrieveSavedData}
                startIcon={<GetAppIcon />}
                fullWidth
            >
                Load
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Load</DialogTitle>
                <DialogContent>

                    <TextField
                        select
                        label="Data list"
                        value={data}
                        onChange={handleChange}
                        helperText="Please select data to load"
                    >
                        {dataList.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined'>
                        Cancel
            </Button>
                    <Button onClick={handleLoadData} variant='outlined'>
                        Confirm
            </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alert.error}
                autoHideDuration={3000}
                onClose={handleAlertClose}
            >
                <MuiAlert
                    onClose={handleAlertClose}
                    elevation={6}
                    variant="filled"
                    severity={alert.severity}
                >
                    {alert.message}
                </MuiAlert>
            </Snackbar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStateAction: (state) => { dispatch(loadStateAction(state)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadButton)
