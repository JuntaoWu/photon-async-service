import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import gameCtrl from '../controllers/game.controller';

const router = express.Router();

router.route('/')
    /** GET /api/games - Get list of games */
    .get((req, res, next) => {
        console.log(req.query);

        gameCtrl.list(req.query)
            .then(games => {
                return res.json(games);
            })
            .catch(next);
    });

router.route('/load')
    /** GET /api/games - Get list of games */
    .post((req, res, next) => {
        console.log(req.query);

        gameCtrl.load(req)
            .then(game => {
                let result = {
                    ResultCode: 0,
                    Message: "OK",
                    State: game && game.State,
                };
                return res.json(result);
            })
            .catch(next);
    });

router.route('/save')
    .post(validate(paramValidation.createGame), (req, res, next) => {
        console.log(req.body);

        return gameCtrl.update(req)
            .then(savedGame => {
                let result = {
                    ResultCode: 0,
                    Message: "OK"
                };
                return res.json(result);
            })
            .catch(e => next(e));
    });

router.route('/leave')
    .post((req, res, next) => {
        console.log(req.body);

        return res.json({
            ResultCode: 0,
            Message: "OK"
        });
    });

export default router;
