let net;

function preprocessImage(image) {
	let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([160, 160])
		.toFloat();
	return tensor.div(255)
			.expandDims();
}

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await tf.loadLayersModel('https://stazam.github.io/M7DataSp---Advanced-data-science-techniques/docs/export_model/model.json');
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.predict(preprocessImage(imgEl));
  const inline = result.dataSync()[0];
  console.log('Prediction done');

  var pred = document.getElementById('pred');
  if (inline < 0.5) {
      prob = ((1-inline)*100).toFixed(2);
      pred.innerHTML = "<b>Quads</b> (probability=".concat(prob, "%)");
  } else {
    prob = (inline*100).toFixed(2);
    pred.innerHTML = "<b>Inline</b> (probability=".concat(prob, "%)");
  }

  return(p_cat);
}

app();

// HTML5 image file reader 
if (window.FileReader) {
  function handleFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          document.getElementById('image').innerHTML = ['<img id="img" crossorigin src="', e.target.result,'" title="', theFile.name, '" width="227"/>'].join('');
        };
      })(f);

      reader.readAsDataURL(f);
   
      app();
  }
} else {
  alert('This browser does not support FileReader');
}

// listener for a new image
document.getElementById('files').addEventListener('change', handleFileSelect, false);