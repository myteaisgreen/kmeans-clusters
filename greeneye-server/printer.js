PNG = require("pngjs").PNG;
var fs = require("fs");

function imagifyCluster(path, data) {
  try {
    var img_data = Uint8ClampedArray.from(data);
    var img_png = new PNG({
      inputColorType: 0,
      colorType: 0,
      width: 28,
      height: 28,
    });

    img_png.data = Buffer.from(img_data);
    img_png.pack().pipe(fs.createWriteStream(`./public/${path}`));

  } catch (err) {
    console.log("ERROR: " + err);
  }
}

exports.imagify = (data) => {
  data.forEach((cluster, index) => {

    cluster.centroidSrc = `images/centroid-${index}.png`;
    imagifyCluster(cluster.centroidSrc, cluster.centroid);

    cluster.points.forEach( (point, pointIndex) => {
      
      let tempPointPath = `images/${index}-point-${pointIndex}.png`
      cluster.pointsSrc.push(tempPointPath);
      imagifyCluster(tempPointPath, point);
    })
  });
}


