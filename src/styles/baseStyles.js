import baseColours from '../styles/baseColours';
import animations from '../styles/radiumAnimations';

export default {
  animations: animations,
  colours: baseColours,
  button: {
    border: `1px solid ${baseColours.dark.primary}`,
    margin: '1%',
    padding: '1%',
    cursor: 'pointer',

    ':hover': {
      borderColor: baseColours.dark.secondary
    }

  },
  layout: {
    columns: {
      display: 'flex',
      flexFlow: 'column'
    },
    rows: {
      display: 'flex',
      flexFlow: 'row'
    },
    flex: n => {
      return {
        flex: n
      };
    }
  }
};
