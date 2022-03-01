const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/joiner.validation');
const joinerController = require('../../controllers/joiner.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createJoiner), joinerController.createJoiner)

  router
  .route('/:joinerId')
  .get(validate(userValidation.getJoiner), joinerController.getJoiner)
  .put(validate(userValidation.updateJoiner), joinerController.updateJoiner)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: joiners
 *   description: joiners management and retrieval
 */

/**
 * @swagger
 * /joiner:
 *   post:
 *     summary: Create a joiner
 *     description: Only admins can create other joiner.
 *     tags: [joiners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - last_name
 *               - role
 *               - stack
 *               - english_level
 *               - domain_experience
 *             properties:
 *               identification_number:
 *                 type: string
 *                 description: must be unique
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               role:
 *                  type: string
 *                  enum: [SC,EN,SE,ST] 
 *               stack:
 *                  type: string
 *                  enum: [net,java,python,node]
 *               english_level:
 *                  type: string
 *                  enum: [A1,A2,B1,B2,C1,C2]  
 *               domain_experience:
 *                  type: string
 *                  enum: [Low,Medium,Advanced]  
 *             example:
 *               identification_number: 2312321
 *               name: fake name
 *               last_name: fake@example.com
 *               role: EN
 *               stack: net
 *               english_level: B1
 *               domain_experience: Advanced
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Joiner'
 *       "400":
 *         $ref: '#/components/responses/DuplicateIdentification'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
  */
/**
 * @swagger
 * /joiner/{id}:
 *   get:
 *     summary: Get a joiner
 *     description: fetch only their own user information.
 *     tags: [joiners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Joiner id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Joiner'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [joiners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Joimer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               role:
 *                  type: string
 *                  enum: [SC,EN,SE,ST] 
 *               stack:
 *                  type: string
 *                  enum: [net,java,python,node]
 *               english_level:
 *                  type: string
 *                  enum: [A1,A2,B1,B2,C1,C2]  
 *               domain_experience:
 *                  type: string
 *                  enum: [Low,Medium,Advanced]  
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Joiner'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
