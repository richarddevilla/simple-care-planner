import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    minWidth: '300px',
    width: '70%',
  },
  paper: {
    padding: '20px',
    margin: '10px',
  },
  siteColor: {
    background: '#264653',
    color: 'whitesmoke',
    fontWeight: 'bold'
  },
}));
export default useStyles
