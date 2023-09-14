const statuses = {
  idle: 'idle',
  engaged: 'engaged',
};

const type = {
  choice: 'choice',
};

const allowedClientRequestType = [type.choice];

const config = {
  interval: 1000,
};

module.exports = {
  statuses,
  config,
  allowedClientRequestType,
  type,
};
