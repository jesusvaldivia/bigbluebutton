import RedisPubSub from '/imports/startup/server/redis';
import Polls from '/imports/api/polls';
import { check } from 'meteor/check';

export default function initiatePoll(credentials, pollType) {
  const REDIS_CONFIG = Meteor.settings.private.redis;
  const CHANNEL = REDIS_CONFIG.channels.toAkkaApps;
  const EVENT_NAME = 'StartPollReqMsg';

  const { meetingId, requesterUserId } = credentials;

  check(meetingId, String);
  check(requesterUserId, String);
  check(pollType, String);

  if (Polls.findOne({})) Polls.remove({});

  const payload = {
    requesterId: requesterUserId,
    pollId: `${meetingId}/1/${requesterUserId}`,
    pollType,
  };

  return RedisPubSub.publishUserMessage(CHANNEL, EVENT_NAME, meetingId, requesterUserId, payload);
}
