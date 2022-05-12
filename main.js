img = "";
status1 = "";
object = [];

function preload(){
    img = loadImage("dog_cat.jpg");
    music = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
   image(video, 0, 0, 380, 380) ;
   
   if(status1 != ""){
       r = random(255);
       g = random(255);
       b = random(255);
       objectDetector.detect(video, gotResult);
       for(i = 0; i<object.length; i++){
        document.getElementById("status").innerHTML = "Status : Detected Objects";
        document.getElementById("number_of_objects").innerHTML = "number of objects detected are : " + object.length;
    
        
        fill(r,g,b);
        percent = floor(object[i].confidence * 100);
        text(object[i].label + "  " + percent + "  %" , object[i].x + 15 , object[i].y + 15 );
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);

        if(object[i].label != "person"){
            document.getElementById("status").innerHTML = "Status : BABY NOT FOUND";
            music.play();
        }
        else{
            document.getElementById("status").innerHTML = "Status : BABY  FOUND";
            music.stop();
        }
       }
   }
   
   
}

 function modelLoaded(){
     console.log("model is loaded");
     status1 = true;
     
 }

 function gotResult(error, results){
     if(error){
         console.log(error);
     }
     else{
         console.log(results);
         object = results;
     }
 }