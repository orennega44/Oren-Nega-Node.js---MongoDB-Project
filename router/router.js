const experss = require("express");
const router = experss.Router();
const userRouterController = require("../users/routes/userRestService")
const cardsRouterController = require('../cards/routes/cardRestService');
const { handleError } = require("../utils/handelError");


router.use('/users', userRouterController);
router.use('/cards', cardsRouterController);
router.use((req, res) => {
    handleError(res, 404, "Path Not Found.")
})

module.exports = router;