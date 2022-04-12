const express = require('express')
const Reminder = require('./models/reminder')
const app = express()
const bodyParser = require('body-parser')
app.use(express.static('build'))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())



const formatReminder = (reminder) => {
  const formattedNote = { name: reminder.name, timestamp: reminder.timestamp, id: reminder._id }
  delete formattedNote._id
  delete formattedNote.__v
  return formattedNote
}


let reminders = [
      {
        name: "HTML is easy",
        timestamp: "2020-01-10T17:30:31.098Z",
        id: 1
      },
      {
        name: "Browser can execute only Javascript",
        timestamp: "2020-01-10T18:39:34.091Z",
        id: 2
      },
      {
        name: "GET and POST are the most important methods of HTTP protocol",
        timestamp: "2020-01-10T19:20:14.298Z",
        id: 3
      },
      {
        name: "JEE",
        timestamp: "2022-01-10T19:20:14.298Z",
        id: 4
      }
    ]
  
    
  app.get('/api/notes', (req, res) => {
        Reminder
          .find({})
          .then(reminders => {
            res.json(reminders.map(formatReminder))
          })
    })
    
    app.get('/api/notes/:id', (request, response) => {
          Reminder
            .findById(request.params.id)
            .then(reminder => {
              if (reminder){
                response.json(formatReminder(reminder))
              }else {
                response.status(404).end()
              }     
            })
            .catch(error => {
              console.log(error)
              response.status(404).send({error: "malformatted id"})
            })
    })

    app.delete('/api/notes/:id', (request, response) => {
      Reminder
        .findByIdAndRemove(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => {
          response.status(400).send({ error: 'malformatted id' })
        })
    })
    

  
    
    app.post('/api/notes', (request, response) => {
      const body = request.body
    
      if (body.name === undefined) {
          return response.status(400).json({error: 'content missing'})
      }else if (body.timestamp === undefined) {
          return response.status(400).json({error: 'content missing'})
      }

      reminders.forEach(reminder => {
        if(reminder.name === body.name){
             return response.status(400).json({ error: 'name must be unique' })
        }
      })
    
      const reminder = new Reminder({
        name: body.name,
        timestamp: body.timestamp
      })
      
    
      reminder
         .save()
         .then(formatReminder)
         .then(savedAndFormattedReminder => {
           response.json(savedAndFormattedReminder)
         })
    })
    


    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })