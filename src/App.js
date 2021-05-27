import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Box, Grid, Paper, Typography } from '@material-ui/core'

import Header from './components/header/header.component'
import PriceList from './components/price-list/price-list.component'
import Funding from './components/funding/funding.component'
import Rates from './components/rates/rates.component'
import ButtonContainer from './components/button-container/button-container.component'
import Visit from './components/visit/visit.component';
import Login from './components/navigation/navigation.component';
import FundingDetails from './components/funding-details/funding-details.component';

import { addVisit } from './actions/actionCreators'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import useStyles from './App.style'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      savedData: null,
    }
  }

  unsubscribeFromAuth = null
  componentDidMount() {
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {    //this bit would make use listen to any changes on userRef
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      this.setState({ currentUser: userAuth }) //if no authorise user set the currentuser to null
    })
  }


  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleAddVisit = () => {
    this.props.addVisit()
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <Grid container className={classes.header} justify='center' direction='column' alignItems="center">
          <Header />
          <Login currentUser={this.state.currentUser} />
        </Grid>
        <Grid container justify='center' alignItems="center" direction='column'>
          <Funding />
          <Grid item className={classes.paperContainer}>
            <Paper className={classes.paper} elevation={5} >
            <Typography className={classes.siteColor} variant='h5'><Box pl={4} mb={2}>Choose Pricing</Box></Typography>
              <Box pb={2}>
                <PriceList />
              </Box>
              <Box pb={2}>
                <Rates />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item className={classes.paperContainer}>
            <Paper className={classes.paper} elevation={5}>

              <Grid item container spacing={1} justify='center' alignItems="center">
                <FundingDetails />
                <ButtonContainer />
                <Visit />
              </Grid>
            </Paper>
          </Grid>
          
        </Grid>
      </div >
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(App));
