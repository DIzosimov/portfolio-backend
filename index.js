const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.listen(port, () => {
  console.log('We are live on port 4444')
})

app.get('/', (req, res) => {
  res.send('Welcome to my api')
})

app.post('/api/v1', (req, res) => {
  let data = req.body

  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'david.izosimov@gmail.com',
      pass: 'Brunella12'
    }
  })

  let mailOptions = {
    from: data.email,
    to: 'david.izosimov@gmail.com',
    subject: 'Inquiry',
    html: `<p>${data.name}</p>
           <p>${data.email}</p>
           <p>${data.message}</p>`
  }

  smtpTransport.sendMail(mailOptions,
    (error, response) => {
      if (error) {
        res.send(error)
      } else {
        res.send('Success')
      }
      smtpTransport.close()
    })
})