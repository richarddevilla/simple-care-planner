import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const [detail, setDetail] = React.useState({ email: '', password: '' })
    const [alert, setAlert] = React.useState({error:false, message:''})

    const handleClickOpen = () => {
        setOpen(true);
        setAlert({error:false, message:''})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const googleLogin = async () => {
        try {
            setOpen(false);
            await signInWithGoogle();       
        } catch (error) {
            console.log(error)
        }        
    }
    const handleChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value })
    }

    const emailLogin = async () => {
        const { email, password } = detail
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setDetail({
                email: '',
                password: ''
            });
            setOpen(false);
            setAlert(false);
        } catch (error) {
            setAlert({
                error:true,
                message:'Invalid email or password'
            })
        }
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        name='email'
                        type="email"
                        onChange={handleChange}
                        fullWidth
                        error={alert.error}
                        helperText={alert.message}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        name='password'
                        onChange={handleChange}
                        fullWidth
                        error={alert.error}
                        helperText={alert.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={emailLogin} variant='outlined'>
                        Login
                    </Button>
                    <Button onClick={googleLogin} variant='outlined'>
                        Google
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
