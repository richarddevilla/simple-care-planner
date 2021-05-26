import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

export default function Register() {
    const [open, setOpen] = React.useState(false);
    const [detail, setDetail] = React.useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const handleChange = (e) => {
        setDetail({...detail, [e.target.name]: e.target.value})
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const emailRegister = async () => {
        const { displayName, email, password, confirmPassword } = detail
        setOpen(false);
        if (password !== confirmPassword) {
            console.log('Password do not Match')
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, { displayName });
            setDetail({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>
                Register
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Display Name"
                        type="text"
                        name='displayName'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email Address"
                        type="email"
                        name='email'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        name='password'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        name='confirmPassword'
                        onChange={handleChange}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={emailRegister} variant='outlined'>
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
