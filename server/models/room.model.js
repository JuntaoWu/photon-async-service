import Promise, { any } from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Game, { GameSchema } from './game.model';

/**
 * Room Schema
 */
const RoomSchema = new mongoose.Schema({
    RoomId: String,
    GameId: Number,
    Game: GameSchema,
    UserId: String,
    NickName: String,
    Status: String,
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
RoomSchema.method({
});

/**
 * Statics
 */
RoomSchema.statics = {
    /**
     * Get game
     * @param {ObjectId} id - The objectId of game.
     * @returns {Promise<Room, APIError>}
     */
    get(roomname) {
        return this.find({ RoomId: roomname })
            .exec()
            .then((rooms) => {
                if (rooms && rooms.length) {
                    return rooms[0];
                }
                else {
                    return null;
                }
            });
    },

    /**
     * List rooms in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of rooms to be skipped.
     * @param {number} limit - Limit number of rooms to be returned.
     * @returns {Promise<Room[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .skip(+skip)
            .limit(+limit)
            .exec();
    },

    getAvailableRooms({ skip = 0, limit = 50, id } = {}) {
        return this.find({ 'GameId': +id })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef Room
 */
export default mongoose.model('Room', RoomSchema);
