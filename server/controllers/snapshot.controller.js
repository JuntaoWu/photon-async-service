import Snapshot from '../models/snapshot.model';

function load(req, res, next, snapshotId) {
  Snapshot.get(snapshotId).then(snapshot => {
    req.snapshot = snapshot;
    return next();
  }).catch(e => {
    next(e);
  });
}

function get(req, res) {
  return res.json({
    Status: 0,
    Code: 200,
    Data: req.snapshot
  });
}

function create(params) {
  const snapshot = new Snapshot({
    GameId: params.body.GameId,
    GameSetupId: params.body.GameSetupId,
    TableInfo: params.body.TableInfo,
    CameraInfo: params.body.CameraInfo,
    AssetList: params.body.AssetList
  });
  return snapshot.save();
}

function update(params) {
  return load(params).then(snapshot => {
    const tmp = snapshot;
    snapshot.title = params.data.title;
    snapshot.content = params.data.content;
    return snapshot.save()
  });
}

function list(params) {
  const { limit = 50, skip = 0, GameSetupId = 0 } = params;
  return Snapshot.list({ limit, skip, GameSetupId })
}

function remove(params) {
  return load(params).then(snapshot => snapshot.remove());
}

export default { load, get, create, update, list, remove };
