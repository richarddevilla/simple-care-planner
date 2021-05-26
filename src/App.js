import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

import Header from './components/header/header.component'
import PriceList from './components/price-list/price-list.component'
import Funding from './components/funding/funding.component'
import Rates from './components/rates/rates.component'
import ButtonContainer from './components/button-container/button-container.component'
import Visit from './components/visit/visit.component';
import Login from './components/navigation/navigation.component';
import FundingDate from './components/funding-date/funding-date.component';
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
        <Grid container className={classes.siteColor} justify='center' direction='column' alignItems="center">
          <Header />
          <Login currentUser={this.state.currentUser} />
        </Grid>

        <Grid container justify='center' alignItems="center" direction='column'>
          <Funding />
          <Grid item className={classes.paperContainer}>
            <Paper className={classes.paper} elevation={5}>
              <Grid item container spacing={1} justify='center' alignItems="center">
                <FundingDate />
                <FundingDetails />
              </Grid>
            </Paper>
          </Grid>
          <PriceList />
          <Rates />
          <ButtonContainer />
          <Visit />
        </Grid>
















        {/* 
        <Card className="my-card">
          <Login currentUser={this.state.currentUser} />
          <Funding />
          <PriceLists />
          <Button variant="secondary" onClick={this.handleAddVisit}>
            <FaPlus /> Add Service
          </Button>
          <hr />
          <Visit />
        </Card> */}
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
