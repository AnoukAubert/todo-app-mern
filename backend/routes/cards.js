const router = require('express').Router();

const {getAllCards, storeCard, deleteCard, dislikeCard, likeCard, getCard} = require("../controllers/cards");

router.get('/cards', getAllCards);
router.get('/cards/:id', getCard);

router.post('/cards', storeCard);

router.delete('/cards', deleteCard);

router.put('/cards/:cardId/likes', likeCard)
router.delete('/cards/:cardId/likes', dislikeCard)


module.exports = router;