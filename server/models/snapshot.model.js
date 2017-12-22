import Promise, { any } from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Snapshot Schema
 */
const SnapshotSchema = new mongoose.Schema({
    ActorCount: Number,
    AppVersion: String,
    AppId: String,
    SnapshotId: String,
    Region: String,
    State: {
        ActorCounter: Number,
        ActorList: [
            {
                ActorNr: Number,
                UserId: String,
                NickName: String,
                Binary: String,
                IsActive: Boolean,
                IsInactive: Boolean,
                DeactivationTime: String
            }
        ],
        Binary: Object,
        CheckUserOnJoin: Boolean,
        CustomProperties: Object,
        DeleteCacheOnLeave: Boolean,
        EmptyRoomTTL: Number,
        IsOpen: Boolean,
        IsVisible: Boolean,
        LobbyType: Number,
        LobbyProperties: Array,
        MaxPlayers: Number,
        PlayerTTL: Number,
        SuppressRoomEvents: Boolean,
        Slice: Number,
    },
    UserId: String,
    NickName: String
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
SnapshotSchema.method({
});

/**
 * Statics
 */
SnapshotSchema.statics = {
    /**
     * Get Snapshot
     * @param {ObjectId} id - The objectId of Snapshot.
     * @returns {Promise<Snapshot, APIError>}
     */
    get(id) {
        return this.findById(id)
          .exec()
          .then((post) => {
            if (post) {
              return post;
            }
            const err = new APIError('No such post exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
          });
      },
    
      /**
       * List posts in descending order of 'createdAt' timestamp.
       * @param {number} skip - Number of posts to be skipped.
       * @param {number} limit - Limit number of posts to be returned.
       * @returns {Promise<Post[]>}
       */
      list({ skip = 0, limit = 50 } = {}) {
        return this.find()
          .sort({ createdAt: -1 })
          .skip(+skip)
          .limit(+limit)
          .exec();
      }
};

/**
 * @typedef Snapshot
 */
export default mongoose.model('Snapshot', SnapshotSchema);
