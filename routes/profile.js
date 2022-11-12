const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profileController = require('../controllers/profile');
const User = require("../models/user");
const auth = require("../auth");
const JWT_SECRET = "hfdjsahkjfhkejhwafjk()234423hjdjfshfague==??fkjdlksafeda134v";
// register endpoint
router.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        glevel: request.body.glevel,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

router.post("/login", (request, response) => {

  User.findOne({email: request.body.email})
      .then((user) => {
        bcrypt.compare(request.body.password, user.password)
          .then((pCheck) => {
            if(!pCheck) {
              return response.status(400).send({
                message: "Password does not match!",
                error,
              });
            }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
              userGrade: user.glevel,
              userScore: user.score,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
          );

          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          })

        })
          .catch((error) => {
            response.status(400).send({
              message: "Password does not match!",
              error,
            });
          })
      })
      .catch((e) => {

        response.status(404).send({
          message: "Email not found",
          e,
        });

      });


});
router.get('/register/:email', async (request, response) => {
  User.findOne({email: request.params.email})
    .then(user => {
      response.json(user);
    });
});

// authentication endpoint
router.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

module.exports=router;