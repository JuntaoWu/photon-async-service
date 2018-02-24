import Game from '../models/game.model';
import Room from '../models/room.model';

function load(params) {
    return Game.get(params.body.GameId);
}

function get(req) {
    return Game.get(req.params.roomname);
}

function create(params) {
    const body = Object.assign({}, params.body, { State: params.body.CreateOptions });
    const game = new Game(body);

    const room = new Room({
        RoomId: game.GameId,
        GameId: game.State.CustomProperties.game.id,
        Game: game,
        UserId: game.UserId,
        NickName: game.NickName,
        Status: 'Created',
    });

    return game.save().then(savedGame => {
        return room.save();
    });
}

function update(params) {
    return load(params).then(game => {
        if (game != null) {
            const tmp = game;
            game.ActorCount = params.body.ActorCount;

            game.State = params.body.State;
        }
        else {
            game = new Game(params.body);
        }

        return game.save().then(savedGame => {
            return Room.find({'RoomId': game.GameId}).then(rooms => {
                const room = rooms && rooms[0];
                if(room != null) {
                    room.Status = params.body.State ? 'Playing' : 'Deleted';
                    return room.save();
                }
                else {
                    return true;
                }
            });
        });
    });
}

function properties(params) {
    return load(params).then(game => {
        if (game != null) {
            const tmp = game;
            game.State.CustomProperties.myRoomActorStates = params.body.Properties.myRoomActorStates;
            game.State.CustomProperties.setupId = params.body.Properties.setupId;
            return game.save();
        }
    });
}

function list(params) {
    const { limit = 50, skip = 0 } = params;
    return Game.list({ limit, skip })
}

function remove(params) {
    return load(params).then(game => game.remove());
}

function getAvailableGames(params) {
    const { limit = 50, skip = 0, id } = params;
    return Game.getAvailableGames({ limit, skip, id });
}

function countAvailableGames(params) {
    return params.id ? Game.count({ 'State.CustomProperties.game.id': +params.id }).exists('State.CustomProperties.game') : Game.count().exists('State.CustomProperties.game');
}

function getAvailableRooms(params) {
    const { limit = 50, skip = 0, id } = params;
    return Room.getAvailableRooms({ limit, skip, id });
}

function countAvailableRooms(params) {
    return params.id ? Room.count({ 'GameId': +params.id }) : Room.count();
}

function listRooms(params) {
    const { limit = 50, skip = 0 } = params;
    return Room.list({ limit, skip });
}

export default { load, get, create, update, list, remove, getAvailableGames, countAvailableGames, getAvailableRooms, countAvailableRooms,listRooms, properties };
