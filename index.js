const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render("index")
})

app.get('/read', async (req, res) => {
  let alltasks = await userModel.find()
  res.render("read", {alltasks})
})

app.get('/edit/:id', async (req, res) => {
  let task = await userModel.findOne({_id: req.params.id})
  res.render("edit", {task})
})

app.post('/update/:id', async (req, res) => {
  let { title, description, tag } = req.body
  let task = await userModel.findOneAndUpdate({_id: req.params.id}, {title, description, tag}, {new: true})
  res.redirect("/read")
})

app.get('/delete/:id', async (req, res) => {
  let alltasks = await userModel.findOneAndDelete({_id: req.params.id})
  res.redirect("/read")
})

app.post('/create', async (req, res) => {
  let {title, description, tag} = req.body

 let createTask = await userModel.create({
    title,
    description,
    tag
  })

  res.redirect("/read")
})

app.listen(3000)