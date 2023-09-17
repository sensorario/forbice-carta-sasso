const type = {
  choice: 'choice',
};

const choices = {
  forbice: 'forbice',
  carta: 'carta',
  sasso: 'sasso',
};

const allowedClientRequestType = [type.choice];

const config = {
  interval: 1000,
  timeLimit: 30,
};

const wins = [
  { first: choices.forbice, second: choices.carta },
  { first: choices.carta, second: choices.sasso },
  { first: choices.sasso, second: choices.forbice },
];

module.exports = {
  config,
  allowedClientRequestType,
  type,
  wins,
};
