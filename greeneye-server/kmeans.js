var clusterMaker = require("clusters");
var fs = require("fs");
var dataFileBuffer = fs.readFileSync(
  __dirname + "/data/train-images.idx3-ubyte"
);
var labelFileBuffer = fs.readFileSync(
  __dirname + "/data/train-labels.idx1-ubyte"
);
var printer = require("./printer");

function getFiveRandomPoints(cluster) {
    var points = [];
  
    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(Math.random() * cluster.points.length);
      let randomImage = cluster.points[randomIndex].slice(0, 783);

      randomImage.forEach((pixel, index, randomImage) => {
        randomImage[index] = Math.round(pixel * 255);
      });
  
      points.push(randomImage);
    }
  
    return points;
  }

function processRawData(imagesToProcess) {
  var data = [];

  for (let image = 0; image < imagesToProcess; image++) {
    var pixels = [];

    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 28; x++) {
        pixels.push(dataFileBuffer[16 + image * 28 * 28 + (x + y * 28)] / 255);
      }
    }

    pixels.push(labelFileBuffer[8 + image]);
    data.push(pixels);
  }

  return data;
}

exports.makeClusters = (k, iterations, imagesToProcess) => {
  const data = processRawData(imagesToProcess);

  clusterMaker.data(data);
  clusterMaker.k(k);
  clusterMaker.iterations(iterations);

  var clusters = clusterMaker.clusters();

  return this.getCentroidsLabelsPoints(clusters);
};


exports.getCentroidsLabelsPoints = (clusters) => {
  var centroidsLabelsPoints = [];

  clusters.forEach((cluster, index) => {
    var centroid = cluster.centroid.slice(0, 783);
    var label = Math.round(cluster.centroid[784]);

    centroid.forEach((pixel, index, centroid) => {
      centroid[index] = Math.round(pixel * 255);
    });

    var points = getFiveRandomPoints(cluster);

    centroidsLabelsPoints.push({
      centroid: centroid,
      centroidSrc: "",
      label: label,
      points: points,
      pointsSrc: []
    });
    
  });

  printer.imagify(centroidsLabelsPoints);
  return centroidsLabelsPoints;
};
