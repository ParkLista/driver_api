const express = require('express');
const { addDriver, getDriver } = require('../controllers/driver')

const router = express.Router();

router.route('/')

    /**
     * @swagger
     * /api/zazu/v1/driver:
     *   post:
     *     summary: Register a new driver
     *     tags: [Driver]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *     responses:
     *       200:
     *         description: Driver was registered successfully
     *         content:
     *           application/json:
     *             schema:
     *       500:
     *         description: Some server error
     */
    .post(addDriver)

    /**
     * @swagger
     * /api/zazu/v1/driver:
     *   get:
     *     summary: Returns an object of a logged driver
     *     tags: [Driver]
     *     responses:
     *       200:
     *         description: Driver profile 
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     */
    .get(getDriver)

module.exports = router;