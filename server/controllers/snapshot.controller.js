import Snapshot from '../models/snapshot.model';

function load(req) {
  return Snapshot.get(req.params.snapshotId);
}

function get(req, res) {
  return res.json(req.snapshot);
}

function create(params) {
  const snapshot = new Snapshot({
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
  const { limit = 50, skip = 0 } = params;
  return Snapshot.list({ limit, skip })
}

function remove(params) {
  return load(params).then(snapshot => snapshot.remove());
}

export default { load, get, create, update, list, remove };
