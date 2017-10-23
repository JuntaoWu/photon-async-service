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
                res.json(games);
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
                    State: game.State,
                };
                return res.json(result);
            })
            .catch(next);
    });

router.route('/save')
    .post(validate(paramValidation.createGame), (req, res, next) => {
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

export default router;
