import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import roomCtrl from '../controllers/room.controller';

const router = express.Router();
router.route('/:roomname').get((req, res, next) => {
    roomCtrl.get(req).then(room => {
        return res.json(room);
    });
});

router.route('/:roomname').post((req, res, next) => {
    roomCtrl.update(req).then(savedRoom => {
        req.app.io.emit('properties', {});
        let result = {
            ResultCode: 0,
            Message: "OK"
        };
        return res.json(result);
    });
});

export default router;