var snap;
var video = document.querySelector('#camera-stream'),
        image = document.querySelector('#snap'),
        error_message = document.querySelector('#error-message');
        app = document.querySelector('.app');

    // The getUserMedia interface is used for handling camera input.
    // Some browsers need a prefix so here we're covering all the options
    navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    

    function start_selfiecam(){

        navigator.getMedia(
            {
                video: true
            },
            // Success Callback
            function(stream){

                // Create an object URL for the video stream and
                // set it as src of our HTLM video element.
                video.src = window.URL.createObjectURL(stream);

                // Play the video element to start the stream.
                video.play();
                video.onplay = function() {
                    showVideo();
                };
         
            },
            // Error Callback
            function(err){
                displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
            }
        );

    }


    function take_photo(){

//e.preventDefault();

        
        snap = takeSnapshot();
        console.log(typeof(snap));
        // Show image. 
        image.setAttribute('src', snap);
        image.classList.add("visible");
        // Pause video playback of stream.
        video.pause();
        doit();

    }

    function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

function doit()
{
    var a="xyz";
    var database = firebase.database();
    console.log("Now Storing");
    bl = dataURItoBlob(snap);
    var currentUserLocal = firebase.database().ref('currentUser');
    currentUserLocal.once('value').then(function(snapshot) 
    {
        a=snapshot.val();
        console.log(a);
        // Create a root reference
        var counterLocal=firebase.database().ref('Counter/' + a);
        counterLocal.once('value').then(function(snapshot)
        {   
            a2=snapshot.val();//count
            console.log(a2);
            var storageRef = firebase.storage().ref();
            // Create a reference to 'images/mountains.jpg'
            var throwbackpic = storageRef.child('throwback/'+ a + '/' + a2);
            var file = bl
            throwbackpic.put(file).then(function(snapshot) 
            {
                console.log('Uploaded a blob or file!'); 
                var f_count=parseInt(a2)+1;
                var updates={}
                updates['/Counter/' + a] = f_count;
                firebase.database().ref().update(updates);
            }); 
        });
    
    });

}
  
    function showVideo(){
        // Display the video stream and the controls.

        hideUI();
        video.classList.add("visible");
    }
    function hideVideo(){
        video.classList.toggle("visible");
        image.classList.remove("visible");
        document.getElementById("app").display="none";
        document.getElementById("snap").display="none";
        document.getElementById("camera-stream").display="none";
    }


    function takeSnapshot(){
        // Here we're using a trick that involves a hidden canvas element.  

        var hidden_canvas = document.querySelector('canvas'),
            context = hidden_canvas.getContext('2d');

        var width = video.videoWidth,
            height = video.videoHeight;

        if (width && height) {

            // Setup a canvas with the same dimensions as the video.
            hidden_canvas.width = width;
            hidden_canvas.height = height;

            // Make a copy of the current frame in the video on the canvas.
            context.drawImage(video, 0, 0, width, height);

            // Turn the canvas image into a dataURL that can be used as a src for our photo.
            return hidden_canvas.toDataURL('image/png');
        }
    }


    function displayErrorMessage(error_msg, error){
        error = error || "";
        if(error){
            console.error(error);
        }

        error_message.innerText = error_msg;

        hideUI();
        error_message.classList.add("visible");
    }

   
    function hideUI(){
        // Helper function for clearing the app UI.

        video.classList.remove("visible");
        image.classList.remove("visible");
        error_message.classList.remove("visible");
    }
