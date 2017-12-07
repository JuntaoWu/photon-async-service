import Promise, { any } from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Game Schema
 */
const GameSchema = new mongoose.Schema({
    ActorCount: Number,
    AppVersion: String,
    AppId: String,
    GameId: String,
    Region: String,
    State: {
        ActorCount: Number,
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
    get(roomname) {
        return this.find({ GameId: roomname })
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
            .exists('State')
            .skip(+skip)
            .limit(+limit)
            .exec();
    },

    getAvailableGames({ skip = 0, limit = 50, id } = {}) {
        return this.find({ 'State.CustomProperties.game.id': parseInt(id) })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef Game
 */
export default mongoose.model('Game', GameSchema);
