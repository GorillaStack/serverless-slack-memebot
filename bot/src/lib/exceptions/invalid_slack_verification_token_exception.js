import MemebotException from './memebot_exception';

export default class InvalidSlackVerificationTokenException extends MemebotException {
  constructor(token) {
    super(`Invalid slack verification token '${token}' recieved`);
  }
}
