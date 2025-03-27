// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayjs = require('dayjs');

function currentTimestamp() {
  return dayjs().unix();
}
module.exports = { currentTimestamp };
