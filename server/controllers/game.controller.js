import Game from '../models/game.model';

function load(params) {
    return Game.get(params.body.GameId);
}

function get(req, res) {
    return res.json(req.game);
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
