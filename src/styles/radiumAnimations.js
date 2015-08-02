import radium from 'radium';

export default {
  pulse: radium.keyframes(
    {
      '0%': {
        width: '10%'
      },
      '50%': {
        width: '50%'
      },
      '100%': {
        width: '10%'
      }
    }
  ),
  flash: radium.keyframes(
    {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    }
  ),
  colourChange: (from, to) => radium.keyframes({
    '0%': {
      color: from
    },
    '100%': {
      color: to
    }
  })
};
