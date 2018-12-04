import Joi from 'joi'
import validate from 'express-validation'
import express from 'express'
import {Responder} from '@codate/commons'
import sendEmail from '../business/usecase/SendEmail.mjs'

const schema = {
    body: {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        template:  Joi.string().required(),
        variables: Joi.any()
    }
}

const router = express.Router()
router.post('/emails', validate(schema), (req, res, next) => {
    const responder = new Responder(req, res, next)
    sendEmail.execute(req.body, responder)
})

export default router
