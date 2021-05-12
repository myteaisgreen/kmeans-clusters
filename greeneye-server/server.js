const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const kmeans = require('./kmeans');

var corsOptions = {
  origin: "http://localhost:3501",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

var options = {
  dotfiles: 'allow',
  etag: false,
  extensions: ['htm', 'html', 'png'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))

app.listen(3500, () => {
  console.log(
    `###\n✌️Server is running on port 3500✌️.\n###`
    );
});

app.post("/clusters", (req, res) => { 
  const k = req.body.k;
  const iterations = req.body.iterations;
  const imagesToProcess = req.body.imagesToProcess;

  try {
    const response = kmeans.makeClusters(k, iterations, imagesToProcess);
    res.status(200).send({message: "SUCCESS", response: response});
  } catch (error) {
    res.status(500).send({error: error})
  }

});

