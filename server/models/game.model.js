import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Game Schema
 */
const GameSchema = new mongoose.Schema({
    ActorCount: {
        type: Number,
    },
    AppVersion: {
        type: String
    },
    AppId: {
        type: String
    },
    GameId: {
        type: String
    },
    Region: {
        type: String
    },
    State: {
        type: Object
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
GameSchema.method({
});

/**
 * Statics
 */
GameSchema.statics = {
    /**
     * Get game
     * @param {ObjectId} id - The objectId of game.
     * @returns {Promise<Game, APIError>}
     */
    get(gameId) {
        return this.find({ GameId: gameId })
            .exec()
            .then((games) => {
                if (games && games.length) {
                    return games[0];
                }
                else {
                    return null;
                }
            });
    },

    /**
     * List games in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of games to be skipped.
     * @param {number} limit - Limit number of games to be returned.
     * @returns {Promise<Game[]>}
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
 * @typedef Game
 */
export default mongoose.model('Game', GameSchema);
