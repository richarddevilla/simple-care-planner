import {
    Grid,
    AppBar,
    Typography,
    Toolbar,
    Button,
} from '@material-ui/core'
import useStyles from './navigation.style'
import { auth } from '../../firebase/firebase.utils'
import React from "react"
import Login from '../login/login.component'
import Register from '../register/register.component'

function Navigation({ currentUser }) {

    const classes = useStyles();
    return (
        <Grid item className={classes.paperContainer} >
            <AppBar position="static" className={classes.siteColor}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" className={classes.title}>
                            Hi { currentUser? currentUser.displayName.toUpperCase() : 'Guest'}
                  </Typography>
                    </Grid>
                    <Grid item>
                        <Toolbar>
                            {currentUser ?
                                <Button
                                    color="inherit"
                                    onClick={() => auth.signOut()}>
                                    Sign Out
                                </Button>
                                :
                                <React.Fragment>
                                    <Login/>
                                    <Register/>
                                </React.Fragment>
                            }
                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
        </Grid>
    );
}

export default Navigation;
