const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllBoats, addBoat, getOneBoat, deleteBoat, editBoat, search} = require ('./database.js');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/api/boats/', (req, res) => {
    getAllBoats(dataOrError =>{
        res.send(dataOrError);
    })
    
});

app.get('/api/boats/:id', (req, res) => {
    getOneBoat(req.params.id, dataOrError =>{
        res.send(dataOrError);
    });
});

app.get('/api/search', (req,res) =>{
    search(req.query, dataOrError =>{
        res.send(dataOrError);
    })
})


//querystring
app.delete('/api/boats/delete/:id', (req, res) => {
    deleteBoat(req.params.id, dataOrError =>{
        res.send(dataOrError)
    });
});
app.post('/api/boats/add', (req,res) =>{
    addBoat(req.body, () =>{
        if(res.statusCode == 200){
            res.send("Success")
        }
    })
})
app.put('/api/boats/edit/:id', (req, res) => {
    editBoat(req.body,req.params.id,()=> {
        res.send(req.body)
    })
});


const port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log("Server is listening on port" + port);
});