const express = require("express");
const chalk = require('chalk');
const { RegisterUser, getUser, updateUser, getAllUsers, userLogin, deleteUser } = require("../models/userAccessDataService");
const auth = require("../../auth/authService");

const router = express.Router();



router.post("/", async (req, res) => {

    try {
        let user = await RegisterUser(req.body);
        res.send(user);
    } catch (error) {
        console.error(chalk.bgRed(error.message));

    }

})

router.post("/login",  async (req, res) => {
    try {
        let { email, password } = req.body;
        const token = await userLogin(email, password);
        res.send(token)

    } catch (error) {
        res.status(500).send(error.message || "Internal Server Error");

    }
})



router.get('/', auth, async (req, res) => {

    try {
        const userInfo = req.user;
        let users = await getAllUsers(userInfo._id);
        res.send(users)

    } catch (error) {
        console.error(chalk.bgRed(error.message));
    }
})


router.get("/:id", auth, async (req, res) => {
    try {

        const { id } = req.params;
        let user = await getUser(id);
        res.send(user)

    } catch (error) {
        console.error(chalk.bgRed(error.message));
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newUser = req.body;
        const userInfo = req.user;

        const originalUser = await getUser(id);

        if (userInfo._id != originalUser.user_id && !userInfo.isAdmin) {

            return console.error("Only Registered user or the admin can update the user details!");

        }

        let user = await updateUser(id, newUser);

        res.send(user)

    } catch (error) {
        console.error(chalk.bgRed(error.message));
    }
})


router.patch("/:id", auth, async (req, res) => {

    
    try {
        const { id } = req.params;
        let user = await updateUser(id);
        res.send(user);




    } catch (error) {
        console.error(chalk.bgRed(error.message));
    }
})

router.delete('/:id', auth, async (req, res) => {

    try {

        const { id } = req.params;
        let user = await deleteUser(id);
        res.send(user);

    } catch (error) {
        console.error(chalk.bgRed(error.message));
    }


})


module.exports = router;