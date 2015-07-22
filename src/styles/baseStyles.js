export default {
  button: {
    border: '1px solid black',
    margin: '1%',
    padding: '1%',
    cursor: 'pointer',

    ':hover': {
      borderColor: 'grey'
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
