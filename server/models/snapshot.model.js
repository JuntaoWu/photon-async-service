import Promise, { any } from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Snapshot Schema
 */
const SnapshotSchema = new mongoose.Schema({
    GameSetupId: {
        type: Number,
        required: true
    },
    TableInfo: {
        type: Object
    },
    CameraInfo: {
        type: Object
    },
    AssetList: {
        type: Array
    }
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
