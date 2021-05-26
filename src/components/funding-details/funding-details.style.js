import { makeStyles } from '@material-ui/core/styles';
import bgImage from './bgImage.jpg'
const useStyles = makeStyles((theme) => ({
  app: {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: '0% 20%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  root: {
    flexGrow: 1,
  },
  siteColor: {
    background: '#264653',
    color: 'whitesmoke'
  },
  title: {
    padding: '30px',
  },
  paperContainer: {
    minWidth: '300px',
    width: '70%',
  },
  selectInput: {
    width: '200px'
  },
  paper: {
    padding: '20px',
    margin: '10px',
  },
  stretchedButton: {
    width: '100%'
  },
  standardText: {
    color: '#264653',
    fontWeight: 'bold'
  }
}));
export default useStyles
