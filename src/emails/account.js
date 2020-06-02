const sgMail = require('@sendgrid/mail')

// const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Simple sending process for email sending testing
// sgMail.send({
//    to: 'kirijaki@me.com',
//    from: 'toni.itkonen@icloud.com',
//    subject: 'This is my first creation!',
//    text: ' I hope this one actually get to you.'
// })

const sendWelcomeEmail = (email, name) => {
   sgMail.send({
      to: email,
      from: 'toni.itkonen@icloud.com',
      subject: 'Thanks for joining in!',
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
   })
}

const sendCancellationEmail = (email, name) => {
   sgMail.send({
      to: email,
      from: 'toni.itkonen@icloud.com',
      subject: 'Sorry to see you leaving!',
      text: `Cancellation is now done ${name}. Let me know is there anything that we could do for you.`
   })
}



module.exports = {
   sendWelcomeEmail,
   sendCancellationEmail
}
