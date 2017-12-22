import Snapshot from '../models/snapshot.model';

function load(params) {
  return Snapshot.get(params.id);
}

function get(req, res) {
  return res.json(req.snapshot);
}

function create(params) {
  const snapshot = new Snapshot({
    title: params.data.title,
    content: params.data.content
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
