import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import snapshotCtrl from '../controllers/snapshot.controller';

const router = express.Router();

router.route('/')
    /** GET /api/snapshots - Get list of snapshots */
    .get((req, res, next) => {
        snapshotCtrl.list(req.query)
            .then(snapshots => {
                let result = snapshots.map(m => {
                    return {
                        SnapshotId: m._id,
                        GameId: m.GameId,
                        GameSetupId: m.GameSetupId,
                        CreatedAt: m.createdAt
                    };
                });
                res.json(result);
            })
            .catch(next);
    })

    /** snapshot /api/snapshots - Create new snapshot */
    .post(validate(paramValidation.createSnapshot), (req, res, next) => {
        snapshotCtrl.create(req).then(savedSnapshot => {
            return res.json({
                Status: 0,
                Code: 200,
                Message: "OK"
            });
        });
    });

router.route('/:snapshotId')
    /** GET /api/snapshot/:snapshotId - Get snapshot */
    .get(snapshotCtrl.get)

    /** PUT /api/snapshots/:snapshotId - Update snapshot */
    .put(validate(paramValidation.updateSnapshot), snapshotCtrl.update)

    /** DELETE /api/snapshots/:snapshotId - Delete snapshot */
    .delete(snapshotCtrl.remove);

/** Load snapshot when API with snapshotId route parameter is hit */
router.param('snapshotId', snapshotCtrl.load);

export default router;
