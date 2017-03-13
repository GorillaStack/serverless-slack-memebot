const stubLogger = {
  log() {},
  debug() {},
  info() {},
  warn() {},
  error() {},
  critical() {},
};

if (process.env.DEBUG) {
  Object.keys(stubLogger).forEach(key =>
    (stubLogger[key] = (...args) => console.log(`[${key}]: `, args)));
}

export default stubLogger;
