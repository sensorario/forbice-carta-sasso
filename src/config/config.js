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
  timeLimit: 10,
};

const wins = [
  { primo: choices.forbice, secondo: choices.carta },
  { primo: choices.carta, secondo: choices.sasso },
  { primo: choices.sasso, secondo: choices.forbice },
];

module.exports = {
  config,
  allowedClientRequestType,
  type,
  wins,
};
