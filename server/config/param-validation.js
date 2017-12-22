import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },
  // POST /api/posts
  createPost: {
    body: {
      title: Joi.string().required(),
    }
  },
  // POST /api/games
  createGame: {
    body: {
      Type: Joi.string().required(),
    }
  },
  // POST /api/snapshot
  createSnapshot: {
    body: {
      GameSetupId: Joi.number().required(),
    }
  },
  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // UPDATE /api/posts/:postId
  updatePost: {
    body: {
      title: Joi.string().required(),
    },
    params: {
      postId: Joi.string().hex().required()
    }
  },
  // UPDATE /api/games/:gameId
  updateGame: {
    body: {
      Type: Joi.string().required(),
    },
    params: {
      GameId: Joi.string().required()
    }
  },
  // UPDATE /api/posts/:postId
  updateSnapshot: {
    body: {
      GameSetupId: Joi.number().required(),
    },
    params: {
      snapshotId: Joi.number().required()
    }
  },
  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
