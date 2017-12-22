import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import snapshotCtrl from '../controllers/snapshot.controller';

const router = express.Router();

router.route('/')
    /** GET /api/snapshots - Get list of snapshots */
    .get((req, res, next) => {
        snapshotCtrl.list(req.query)
            .then(users => { res.json(users); })
            .catch(next);
    })

    /** snapshot /api/snapshots - Create new snapshot */
    .post(validate(paramValidation.createsnapshot), snapshotCtrl.create);

router.route('/:snapshotId')
    /** GET /api/snapshot/:snapshotId - Get snapshot */
    .get(snapshotCtrl.get)

    /** PUT /api/snapshots/:snapshotId - Update snapshot */
    .put(validate(paramValidation.updatesnapshot), snapshotCtrl.update)

    /** DELETE /api/snapshots/:snapshotId - Delete snapshot */
    .delete(snapshotCtrl.remove);

/** Load snapshot when API with snapshotId route parameter is hit */
router.param('snapshotId', snapshotCtrl.load);

export default router;
