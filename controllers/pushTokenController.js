const PushTokens = require("../models/pushTokens");
const passport = require("passport");

module.exports = app => {
  app.get(
    "/api/pushToken",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      PushTokens.find((error, pushTokens) => {
        if (error) {
          res.status(501).send({ error });
        }
        res.send(pushTokens);
      });
    }
  );
  // creates new push token
  app.post(
    "/api/pushToken",
    (req, res) => {
      var now = new Date()
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, "");
      var tokenData = Object.assign({}, req.body, { lastUsed: now, $inc: {checkinCount: 1} });

      PushTokens.findOneAndUpdate(
        { pushToken: tokenData.pushToken },
        tokenData,
        {
          // Return new token if updated (instead of original), create a new
          // record if none exists. There aren't any defaults in the push token
          // schema yet, but in case there ever are, setDefaultsOnInsert is
          // probably the behavior we'd want.
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        },
        (error, token) => {
          error
            ? res.status(501).send({
                error: `Error creating or updating push token ${tokenData.pushToken}: ${error}`
              })
            : res.send(token);
        }
      );
    }
  );
};
