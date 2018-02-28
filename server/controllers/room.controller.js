import Room from '../models/room.model';

function load(params) {
    return Room.get(params.body.GameId);
}

function get(req) {
    return Room.get(req.params.roomname);
}

function update(req) {
    return Room.find({ 'RoomId': req.params.roomname }).then(rooms => {
        const room = rooms && rooms[0];
        if (room != null) {
            room.Status = +req.body.status;
            return room.save();
        }
        else {
            return true;
        }
    });
}

function leave(req) {
    return Room.find({ 'RoomId': req.body.GameId }).then(rooms => {
        const room = rooms && rooms[0];
        if (room != null) {
            if (req.body.IsInactive) {
                room.MyRoomActorStates = room.MyRoomActorStates.map(player => {
                    if (player.name == req.body.Nickname) {
                        player.active = false;
                    }
                    return player;
                });
            }
            else {
                room.MyRoomActorStates = room.MyRoomActorStates.filter(player => player.name != req.body.Nickname);
            }
            return room.save();
        }
        else {
            return true;
        }
    });
}

export default { load, get, update, leave };