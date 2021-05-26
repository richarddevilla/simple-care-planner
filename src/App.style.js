import bgImage from './assets/bgImage.jpg'
const useStyles = () => ({
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
  paperContainer: {
    minWidth: '300px',
    width: '70%',
  },
  paper: {
    padding: '20px',
    margin: '10px',
  },
});
export default useStyles
