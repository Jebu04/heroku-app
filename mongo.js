const url = 'mongodb+srv://Jebu33:<q5yD8mMSg06kwxPr>@cluster0.emvwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })