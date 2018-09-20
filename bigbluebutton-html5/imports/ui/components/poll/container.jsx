import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { makeCall } from '/imports/ui/services/api';
import Poll from './component';

const PollContainer = ({ ...props }) => <Poll {...props} />;

export default withTracker(() => {
  const pollTypes = {
    YN: 'YN', // Yes,No
    TF: 'TF', // True,False
    A2: 'A-2', // A,B
    A3: 'A-3', // A,B,C
    A4: 'A-4', // A,B,C,D
    A5: 'A-5', // A,B,C,D,E
  };

  const startPoll = type => makeCall('initiatePoll', type);

  return {
    pollTypes,
    startPoll,
  };
})(PollContainer);
