import _ from 'lodash'

class EmailCreator {
    prepare(to, template, variables) {
        const html = this.compileTemplate(template.content, variables)
        return this.createBody(to, template.subject, html)
    }

    compileTemplate(content, variables) {
        const compiled = _.template(content)
        return compiled(variables)
    }

    createBody(to, subject, html) {
        return {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: subject,
            html: html,
            text: '',
            password: process.env.EMAIL_PASSWORD
        }
    }
}

const emailCreator = new EmailCreator()
export default emailCreator

