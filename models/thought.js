const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dataFormat");

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

// `thoughtText`,`createdAt`,`username`,`reactions`
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );


//   Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
  
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const thought = model("thought", thoughtSchema);
  
  module.exports = thought;