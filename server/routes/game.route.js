import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import gameCtrl from '../controllers/game.controller';

const router = express.Router();

router.route('/')
    /** GET /api/games - Get list of games */
    .get((req, res, next) => {
        console.log("list:", req.query);

        gameCtrl.list(req.query)
            .then(games => {
                return res.json(games);
            })
            .catch(next);
    });

router.route('/availablerooms')
    .get((req, res, next) => {
        console.log("availablerooms:", req.query);

        const promise = req.query.id ? gameCtrl.getAvailableGames(req.query) : gameCtrl.list(req.query);

        promise.then(games => {
            return res.json(games);
        }).catch(next);
    });

router.route('/create')
    .post(validate(paramValidation.createGame), (req, res, next) => {
        console.log("create:", req.body);

        return gameCtrl.create(req)
            .then(savedGame => {
                let result = {
                    ResultCode: 0,
                    Message: "OK"
                };
                return res.json(result);
            })
            .catch(e => next(e));
    });

router.route('/load')
    /** GET /api/games - Get list of games */
    .post((req, res, next) => {
        console.log("load:", req.query);

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

router.route('/properties')
    .post((req, res, next) => {
        console.log("properties:", req.body);

        gameCtrl.properties(req)
            .then(savedGame => {
                req.app.io.emit('properties');
                let result = {
                    ResultCode: 0,
                    Message: "OK"
                };
                return res.json(result);
            })
            .catch(e => {
                console.error(e);
                next(e);
            });
    });

router.route('/join')
    .post((req, res, next) => {
        console.log("join:", req.body);

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


router.route('/leave')
    .post((req, res, next) => {
        console.log("leave:", req.body);

        return res.json({
            ResultCode: 0,
            Message: "OK"
        });
    });

router.route('/save')
    .post(validate(paramValidation.createGame), (req, res, next) => {
        console.log("save:", req.body);

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
