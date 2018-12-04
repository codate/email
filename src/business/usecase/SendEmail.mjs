import _ from 'lodash'
import emailSender from '../entity/EmailSender'
import emailCreator from '../entity/EmailCreator'
import templateRepository from '../../repository/TemplateRepository'

class SendEmail {
    async execute(emailBody, responder) {
        try {
            const template = await templateRepository.findByName(emailBody.template)
            if (_.isEmpty(template)) {
                throw new Error('TEMPLATE_NOT_EXIST')
            }
            emailBody.variables.process = process
            const emailData = emailCreator.prepare(emailBody.email, template, emailBody.variables)
            await emailSender.send(emailData)
            responder.success({sucess: true})
        } catch (err) {
            responder.error(err)
        }
    }
}

const sendEmail = new SendEmail()
export default sendEmail
