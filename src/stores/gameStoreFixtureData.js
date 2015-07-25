export default {
  timeInterval: 500,
  playerTimeInterval: 20,
  teamTimeInterval: 15,
  ownQuestionPoints: 4,
  bonusQuestionPoints: 3,
  i18n: {
    answerDesc: 'Answer',
    startText: 'Start',
    pauseText: 'Pause',
    roundDesc: 'Round',
    player: 'Player',
    team: 'Team',
    over: 'Over',
    timesUp: 'Time\'s Up!',
    incorrect: 'Incorrect',
    nextQuestion: 'Next Question'
  },
  qm: {
    playerId: 1,
    name: 'Question Master'
  },
  venue: 'Some Venue',
  setBy: 'Some setter',
  questionSet: [
    {
      answer: 'Spain',
      id: '1ab405f8-ade0-4c8c-a97d-352c65ba4354',
      indx: '3A',
      question: 'The films Open Your Eyes and Women on the Verge of a Nervous Breakdown' +
      'were made in which European country?',
      round: 4
    },
    {
      answer: 'Fara Williams',
      id: '55a63ac9-6930-4109-8f2f-456f42d5c44e',
      indx: '2A',
      question: 'Notable for having been homeless during the early' +
      'party of her international career,' +
      'which Liverpool midfielder scored England\'s equaliser in their' +
      'FIFA Women\'s World Cup semi-final' +
      'against Japan, but could not prevent England\'s ultimate 2-1 defeat?',
      round: 4
    },
    {
      answer: 'Manchester Ship Canal',
      id: '1abee57d-e24b-4528-834d-a3a17d790e26',
      indx: '4B',
      question: 'The longest motorway bridge in the UK when built, the Thelwall Viaduct carries' +
      'the M6 motorway over the river Mersey and which other northern English waterway?',
      round: 4
    }
  ],
  teams: {
    homeName: 'The Home Team',
    homeHandicap: 7,
    awayName: 'The Away Team',
    awayHandicap: 10,
    firstTeamType: 1,
    players: [
      {
        seat: 1,
        playerId: 1,
        name: 'Player H1',
        isQuestionee: true,
        teamType: 1
      },
      {
        seat: 2,
        playerId: 2,
        name: 'Player H2',
        isQuestionee: false,
        teamType: 1
      },
      {
        seat: 3,
        playerId: 3,
        name: 'Player H3',
        isQuestionee: false,
        teamType: 1
      },
      {
        seat: 4,
        playerId: 4,
        name: 'Player H4',
        isQuestionee: false,
        teamType: 1,
        isCaptain: true
      },
      {
        seat: 1,
        playerId: 5,
        name: 'Player A1',
        isQuestionee: false,
        teamType: 2
      },
      {
        seat: 2,
        playerId: 6,
        name: 'Player A2',
        isQuestionee: false,
        teamType: 2
      },
      {
        seat: 3,
        playerId: 7,
        name: 'Player A3',
        isQuestionee: false,
        teamType: 2
      },
      {
        seat: 4,
        playerId: 8,
        name: 'Player A4',
        isQuestionee: false,
        teamType: 2,
        isCaptain: true
      }
    ]
  }
};
