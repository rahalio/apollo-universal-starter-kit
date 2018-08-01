import React from 'react';
import moment from 'moment';

const messagesFormatter = Component => {
  return props => {
    const { messages } = props;

    if (messages) {
      const timeDiff = moment().utcOffset() * 60000;
      const formatMessages = messages.edges
        .map(({ node: { id: _id, text, userId, username, createdAt, uuid, reply, image, path } }) => ({
          _id,
          text,
          createdAt: moment(moment(createdAt) + timeDiff),
          user: { _id: userId ? userId : uuid, name: username || 'Anonymous' },
          reply,
          image,
          loadingImage: path && !image,
          update: reply ? Date.now() : null
        }))
        .reverse();
      return <Component {...props} messages={{ ...props.messages, edges: formatMessages }} />;
    } else {
      return <Component {...props} />;
    }
  };
};

export default messagesFormatter;