import Game from '../models/game.model';


function load(params) {
    return Game.get(params.body.GameId);
}

function get(req, res) {
    return res.json(req.game);
}

function create(params) {
    const game = new Game(params.body);
    return game.save();
}

function update(params) {
    return load(params).then(game => {
        if(game != null) {
            const tmp = game;
            game.State = params.body.State;
            console.log(game);
        }
        else {
            game = new Game(params.body);
        }
        return game.save();
    });
}

function list(params) {
    const { limit = 50, skip = 0 } = params;
    return Game.list({ limit, skip })
}

function remove(params) {
    return load(params).then(game => game.remove());
}

export default { load, get, create, update, list, remove };
