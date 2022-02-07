prediction1 = "";

Webcam.set ({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version" , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zkSVPmn3S/model.json' , modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
    synth = window.speechSynthesis;
    speak_data_1 = "The prediction is" + prediction1;
    utter_this = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utter_this);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if (results[0].label == "t"){
            document.getElementById("emoji").innerHTML = "&#129304;";
        }
        if (results[0].label == "v"){
            document.getElementById("emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "h"){
            document.getElementById("emoji").innerHTML = "&#128400;";
        }
    }
}