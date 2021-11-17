// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

const hbs			= require("hbs")

const PunkAPIWrapper	= require("punkapi-javascript-wrapper")
const punkAPI			= new PunkAPIWrapper()

require("dotenv").config()

// 2. MIDDLEWARES
app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")

// 3. RUTAS

app.get("/random-beer", (req, res) => {
    const randomBeers = punkAPI.getRandom()
    randomBeers
    .then((beers)=>{
        res.render("random-beer",{
            cheve:beers 
        })
    })
})

app.get("/beers", (req, res) => {


    
	const listBeers = punkAPI.getBeers()
	console.log(listBeers)


	listBeers
		.then((beers) => { 
			
			console.log(beers)

			res.render("beers", {
				data: beers
			})

		})
		.catch((error) => { 
			console.log(error)
		})
	
	
})


app.get("/", (req,res) => {
	res.render("home")
})

// 4. SERVIDOR

app.listen(process.env.PORT, () => {
	console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
})