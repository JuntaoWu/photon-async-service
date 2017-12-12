import Game from '../models/game.model';

function load(params) {
    return Game.get(params.body.GameId);
}

function get(req) {
    return Game.get(req.params.roomname);
}

function create(params) {
    const body = Object.assign({}, params.body, { State: params.body.CreateOptions });
    const game = new Game(body);
    return game.save();
}

function update(params) {
    return load(params).then(game => {
        if(game != null) {
            const tmp = game;
            game.ActorCount = params.body.ActorCount;
            
            game.State = params.body.State;
        }
        else {
            game = new Game(params.body);
        }
        return game.save();
    });
}

function properties(params) {
    return load(params).then(game => {
        if(game != null) {
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
    const { limit = 50, skip = 0, id} = params;
    return Game.getAvailableGames({limit, skip, id});
}

export default { load, get, create, update, list, remove, getAvailableGames, properties };
