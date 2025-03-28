let data;
let pictures = [];
let stage = 1;
let easing;
let strokeW = 2;
let targetStroke = 5;
let textSaturation = 100;
let targetTextSaturation = 0;
let textTransparency = 100;
let targetTextTransparency= 100;

let currentFSize = 300;
let targetFSize = 0;

let currentASize = 160;
let targetASize = 100;

let currentCSize = 200;
let targetCSize = 160;

let currentESize = 270;
let targetESize = 50;

let currentSSize = 220;
let targetSSize = 200;


function preload() {
    data = loadJSON('data.json');
    font = loadFont('assets/RedHatDisplay-Bold.ttf');
}

function setup() {
    createCanvas(600, 900);
    colorMode(HSB, 360, 100, 100, 100);
    background(0, 0, 11, 100);
    textFont(font);
    textAlign(RIGHT);

    for (let i = 0; i < data.Picture.length; i++) {
        let dataInstance = {
            "gender": data.Picture[i].gender,
            "BWgender": data.Picture[i].BWgender,
            "Mgender": data.Picture[i].Mgender,
            "face": data.Picture[i].face,
            "age":  data.Picture[i].age,
            "emotion": data.Picture[i].emotion,
            "counter": 1,
            "posX": genderToCoord(data.Picture[i].gender),
            "posY": faceToCoord(data.Picture[i].face),
            "targetX": genderToCoord(data.Picture[i].BWgender),
            "targetSaturation": 0,
            "currentSaturation": 100,
            "targetPolygon": 40,
            "currentPolygon": ageToPolygon(data.Picture[i].age),
            "targetTransparency": 0,
            "currentTransparency": 0,
            "targetStrokeTransparency": 100,
            "currentStrokeTransparency": 100,
            "targerBrightness": emotionToBrightness(data.Picture[i].emotion),
            "currentBrightness": 100
        }

        pictures.push(dataInstance);
    }


    // for (let i = 0; i < pictures.length; i++){
        
    //     targetX.push(genderToCoord(pictures[i].BWgender));
    //     posX.push(genderToCoord(pictures[i].gender));
    //     counter.push(1);
    //     targetSaturation.push(0);
    //     currentSaturation.push(100);
    //     targetPolygon.push(40);
    //     currentPolygon.push(ageToPolygon(pictures[i].age));
    // }

    easing = 0.05;
}

function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}

function trCX(x){
    return x+400;
}
  
function trCY(y) {
    return 400-y;
}  

function genderToCoord(gender) {
    return map(gender, -1, 1, -200, width+200);
}

function faceToCoord(face) {
    return map(face, 0, 10, height+300, -50);
}

function ageToSize(age) {
    return map(age, 1, 10, 10, 50);
}

function ageToPolygon(age) {
    return round(map(age, 1, 10, 3, 12));
}

function emotionToColor(emotion) {
    return map(emotion, 1, 7, 0, 360);
}

function emotionToBrightness(emotion){
    return map(emotion, 1, 7, 40, 100);
}

// Easing function
function easeInOutSine(t) {
    let r = -0.5 * (cos(PI * t) - 1);
    //console.log(r)
    return t
}

function checkTransition (pictures, state) {
    let flag = true;
    for (let i = 0; i < pictures.length; i++) {
        if (pictures[i].counter != state) flag = false; 
    }
    return flag;
}

function counterChange (counter) {
    if (counter == 1) return 2;
    else if (counter == 2) return 3;
    else if (counter == 3) return 1;
    else window.alert("counter changing went wrong");
}

function draw() {
    clear();
    background(0, 0, 11);
    
  
//    stroke(0, 0, 100);
    // text("F", width/6, height*2/9);
    // text("A", width*2/3, height*5/13);
    // text("C", width*1/4, height*5/9);
    // text("E", width*10/13, height*2/3);
    // text("S", width*5/9, height*8/9);
    // text("see faces?", width/2, height/2);
    // textAlign(RIGHT);
    // text("see faces?", width-50, height-50);
  
    if (checkTransition(pictures, 1)) {
        stage = counterChange(stage);
        targetStroke = 2;
        targetTextSaturation = 0;
        targetTextTransparency = 100;
        targetFSize = 300;
        targetASize = 160;
        targetCSize = 200;
        targetESize = 270;
        targetSSize = 220;
        
        for (let i = 0; i < pictures.length; i++) {
            pictures[i].targetX = genderToCoord(pictures[i].BWgender);
            pictures[i].targetSaturation = 0;
            pictures[i].targetPolygon = 40;
            pictures[i].targetTransparency = 0;
            pictures[i].targetStrokeTransparency = 100;
            pictures[i].targetBrightness = emotionToBrightness(pictures[i].age);
        }
    }

    if (checkTransition(pictures, 2)) {
        stage = counterChange(stage);
        targetStroke = 2;
        targetTextSaturation = 0;
        targetTextTransparency = 0;
        targetFSize = 0;
        targetASize = 100;
        targetCSize = 160;
        targetESize = 50;
        targetSSize = 200;
        for (let i = 0; i < pictures.length; i++) {
            pictures[i].targetX = genderToCoord(pictures[i].Mgender);
            pictures[i].targetSaturation = 100;
            pictures[i].targetPolygon = 40;
            pictures[i].targetTransparency = 50;
            pictures[i].targetStrokeTransparency = 0;
            pictures[i].targetBrightness = 100;
        }
    }

    if (checkTransition(pictures, 3)) {
        stage = counterChange(stage);
        targetStroke = 2;
        targetTextSaturation = 100;
        targetTextTransparency = 100;
        targetFSize = 300;
        targetASize = 160;
        targetCSize = 200;
        targetESize = 270;
        targetSSize = 220;
        for (let i = 0; i < pictures.length; i++) {
            pictures[i].targetX = genderToCoord(pictures[i].gender);
            pictures[i].targetSaturation = 100;
            pictures[i].targetPolygon = ageToPolygon(pictures[i].age);
            pictures[i].targetTransparency = 0;
            pictures[i].targetStrokeTransparency = 100;
            pictures[i].targetBrightness = 100;
        }
    }
  
  textSaturation += (targetTextSaturation - textSaturation)*easing;
  textTransparency += (targetTextTransparency - textTransparency)*easing;
  currentFSize += (targetFSize - currentFSize)*easing;
  currentASize += (targetASize - currentASize)*easing;
  currentCSize += (targetCSize - currentCSize)*easing;
  currentESize += (targetESize - currentESize)*easing;
  currentSSize += (targetFSize - currentSSize)*easing;
  
  
  
  fill(232, textSaturation, 100, textTransparency);
  noStroke();
  //strokeWeight(10);
  textAlign(CENTER);
  textSize(currentFSize);
  text("F", width/6, height*3/9);
  textSize(currentASize);  
  fill(232, textSaturation, 100, textTransparency-30);
  text("A", width*2/3, height*5/13);
  textSize(currentCSize);  
  fill(232, textSaturation, 100, textTransparency-60);
  text("C", width*1/4, height*5/9);
  textSize(currentESize-30);  
  fill(232, textSaturation, 100, textTransparency-20);
  text("E", width*10/13, height*2/3);
  textSize(currentSSize-80);  
  fill(232, textSaturation, 100, textTransparency-40);
  text("S", width*5/9, height*8/9);

    for (let i = 0; i < pictures.length; i++){
        if (Math.abs(pictures[i].targetX - pictures[i].posX) <= 0.1 && pictures[i].counter == stage) {
            pictures[i].counter = counterChange(pictures[i].counter);
        }
    
        pictures[i].posX += (pictures[i].targetX - pictures[i].posX) * easing;
        pictures[i].currentSaturation += (pictures[i].targetSaturation-pictures[i].currentSaturation) * easing;
        pictures[i].currentPolygon += (pictures[i].targetPolygon - pictures[i].currentPolygon) * easing;
        pictures[i].currentTransparency += (pictures[i].targetTransparency - pictures[i].currentTransparency) * easing;
        pictures[i].currentStrokeTransparency += (pictures[i].targetStrokeTransparency - pictures[i].currentStrokeTransparency) * easing;
        strokeW +=(targetStroke - strokeW) * easing;
//        pictures[i].currentBrightness += (pictures[i].targetBrightness - pictures[i].currentBrightness) * easing;

        // let targetY = faceToCoord(pictures[i].face);
        // let dy = targetY - posY;
        // posY += dy * easing;
        strokeWeight(strokeW);
        stroke(round(emotionToColor(pictures[i].emotion)), pictures[i].currentSaturation, 100, pictures[i].currentStrokeTransparency);
        fill(round(emotionToColor(pictures[i].emotion)), pictures[i].currentSaturation, 100, pictures[i].currentTransparency);
        // circle(pictures[i].posX, pictures[i].posY, ageToSize(pictures[i].age));
      //fill(0, 0, 11, 0);
        polygon(pictures[i].posX, pictures[i].posY, ageToSize(pictures[i].age), round(pictures[i].currentPolygon));
      
    }

    
}