window.onload = function () {
  OpenBootstrapPopup();
};
function OpenBootstrapPopup() {
  $("#simpleModal").modal('show');
}

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const trackingElement = document.getElementById('tracking');
const canvasCtx = canvasElement.getContext('2d');
let index; // 1=> index levé
let deux;  // 2=> doigt levés
let trois; // 3 => levéss
let g_deux;
let gauche; 
let droite;
let pleve;
let iLeve; 
let iLeveG;
let Palm;



// PARTIE HANDS ////////////////////////////////////////////////////////
// le modèle Hands analyse une image reçue et l'interprète en me retournant
// des données chiffrées
// - onResult = fonction déclenchée quand hands a des infos à me transmettre...
// hands a deja 3 methodes 
// - setOptions( obj ) 
// - onResults( fn ) 
// - send( obj ) 
function saiaOnResults(results) {
  // console.log(results)
  
  canvasCtx.save(); // contexte sauvegardé

  // modification temporaire du contexte 
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks[0]) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
    // let main1 = results.multiHandLandmarks[0];
    // // console.log(main1[8].y);
    // if(main1[8].y < main1[7].y && main1[6].y<main1[10].y && main1[4].x < main1[8].x){ //là on dit que la position 8 est plus haut que tous les autres
    //   index = 1; 
    // }
    // else{
    //   index = 0;
    // }
    // console.log(index, "indexe");


    let main2 = results.multiHandLandmarks[0];
    // console.log(main2[8,12].y);
    if(main2[8].y < main2[6].y && main2[12].y < main2[10].y 
      && main2[16].y > main2[14].y 
      && main2[20].y > main2[18].y
      && main2[4].x < main2[8].x){ //là on dit que la position 8 est plus haut que tous les autres
      deux = 1; 
      document.body.style.backgroundColor = "red"; 
    }
    else{
      deux = 0;
    }
    // console.log(deux, "deux");
    // let maing2 = results.multiHandLandmarks[0];
    // // console.log(main2[8,12].y);
    // if(maing2[8].y && maing2[12].y < maing2[6].y && maing2[10].y && maing2[16].y > maing2[14].y && maing2[20].y > maing2[18].y
    //    && (maing2[4].x > maing2[8].x)){ //là on dit que la position 8 est plus haut que tous les autres
    //   g_deux = 1;

    // }
    // else{
    //   g_deux = 0;
    // }
    // console.log(g_deux, " gauche deux");



    let main3 = results.multiHandLandmarks[0];
    // console.log(main3[8,12,16].y);
    if(main3[8].y < main3[6].y && main3[12].y < main3[10].y 
      && main3[16].y < main3[14].y 
      && main3[4].x < main3[8].x 
      && main3[20].y >= main3[18].y && main3[9].y 
      && main3[20].y > main3[19].y > main3[18].y){ ///position où l'index, la majeure et l'anulaire fait le trois
      trois = 1;
    } else if ( main3[4].y < main3[2].y && main3[8].y < main3[6].y 
      && main3[12].y < main3[10].y && main3[16].y > main3[14].y 
      && main3[20].y > main3[18].y
      ){ //position où le pouce, l'indexe, et la majeure fait le chiffre trois
      trois = 1;
      document.body.style.backgroundColor = "blue"; 
    } 
    else {
      trois = 0;
    }
    // console.log(trois, 'trois');


    let main4 = results.multiHandLandmarks[0];
    // console.log(main4[8,12,16].y);
    if(main4[4].y && main4[3].y && main4[2].y < main4[8].y && main4[7].y && main4[6].y && main4[5].y ){
      pleve = 1   ////Il faut que le y de 4, 3 , 2 soient supérieur à la ligne des index qui sont 7,6,5 et il y aura donc un pouce levé 
      document.body.style.backgroundColor = "pink"; 
    } 
    else {
      pleve = 0;
    }
    // console.log(pleve, 'pleve');

    let main5 = results.multiHandLandmarks[0];
    // console.log(main4[8,12,16].y);
    if(main5[8].y <  main5[10].y && main5[14].y && main5[18].y && main5[16].y > main5[15].y > main5[14].y > main5[13].y && main5[20].y > main5[19].y
      > main5[18].y && main5[12].y > main5[11].y > main5[10].y && main5[4].x < main5[5].x && main5[4].x < main5[8].x){
      iLeve = 1   ////L'indexe droite est levé, en sachant que l'axe du pouce est plus petit que l'indexe 
      document.body.style.backgroundColor = "yellow"; 
    } 
    else {
      iLeve = 0;
    }
    console.log(iLeve, 'index levé');

    // let main5g = results.multiHandLandmarks[0];
    // // console.log(main4[8,12,16].y);
    // if(main5g[8].y <  main5g[10].y && main5g[14].y && main5g[18].y && main5g[16].y > main5g[15].y > main5g[14].y > main5g[13].y && main5g[20].y > main5g[19].y
    //   > main5g[18].y && main5g[12].y > main5g[11].y > main5g[10].y && main5g[4].x > main5g[5].x && main5g[4].x > main5g[8].x){
    //   iLeveG = 1   ////L'index gauche est levé, en sachant l'axe X du pouce est plus grand que l'indexe
    // } 
    // else {
    //   iLeveG = 0;
    // }
    // console.log(iLeveG, 'index gauche levé');
    
    let main6 = results.multiHandLandmarks[0];
    // console.log(main4[8,12,16].y);
    if(main6[4].y <  main6[2].y && main6[8].y < main6[6].y && main6[12].y < main6[10].y && main6[16].y < main6[14].y && main6[20].y < main6[18].y
      && main6[8].y < main6[5].y && main6[12].y < main6[9].y && main6[16].x < main6[13].y && main6[4].x > main6[8].x ){
      Palm = 1   ////L'indexe droite est levé, en sachant que l'ax du pouce est plus petit que l'indexe 
      document.body.style.backgroundColor = "green";
    } 
    else {
      Palm = 0;
    }
    // console.log(Palm, 'palm');

  }
  canvasCtx.restore(); // contexte remis en place
  //
  // pas ici !!!!!
  //trackingElement.innerHTML="saia" ;

}

// on crée une var objet , instance de Hands 
const hands = new Hands( 
  { locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
  });
// on paramètre les options pour le hands qui a été créé  
// et on dit quelle fonction déclencher si il a des résultats
hands.setOptions(
  { maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
hands.onResults(saiaOnResults);

// PARTIE CAMERA //////////////////////////////////////////////////////////
// Camera permet de capter le flux video du PC. 
// - start() = demarre le flux
// - à la creation, on peut dire la cible HTML et sa taille 
//   et dans onFrame : on peut dire quoi faire de chauqe image captée
//
// on crée une var objet (instance de Camera) afin de disposer en live du flux 
// de la camera dans la balise video ( variable videoElement)
// le 2e paramètre est un objet avec 3 propriétés : onFrame, width, height 
// - onFrame dit de transferer l'image à hands (voir methode send ) 
const camera = new Camera( 
  videoElement, 
  { onFrame: async () => {
      // ne pas toucher ici !!!! 
      await hands.send({image: videoElement});
    },
    width: 640, 
    height: 360,
  }  
);  // 1280 x 720 --> 640 x 360
camera.start();

