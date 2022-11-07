const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return `${date.toLocaleDateString('en-us', { month: 'short' })} ${formatDay(date.getDate())}, ${date.getFullYear()} at ${date.toLocaleTimeString('en-us',)}`
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

const formatDay = (day) => {
  if (day > 3 && day < 21) return day + 'th';
  switch (day % 10) {
    case 1: return day + "st";
    case 2: return day + "nd";
    case 3: return day + "rd";
    default: return day + "th";
  };
};

module.exports = reactionSchema;