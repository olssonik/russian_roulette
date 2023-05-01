  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAi3l1gZSMFDnDarwHJSw8ZU5KvvT0lZLs",
    authDomain: "russian-roulette-4eb79.firebaseapp.com",
    projectId: "russian-roulette-4eb79",
    storageBucket: "russian-roulette-4eb79.appspot.com",
    messagingSenderId: "235784460139",
    appId: "1:235784460139:web:45409c1857276e7d8a5e2e"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()
var ref = database.ref();





  // Retrieve the number from Firebase
  function get() {
  ref.once('value')
    .then(function(snapshot) {
      var data = snapshot.val();
      // global variable numerek (number from database)
      object1 = data
      console.log(data);
      document.getElementById("object1").innerText = object1.globalShots;
      document.getElementById("object2").innerText = "Global Deaths: " + object1.deaths;
      document.getElementById("object3").innerText = object1.variable3;
    });
  }






  // Define a function to save three variables to Firebase
function saveDataToFirebase(globalShots, deaths, variable3) {
  ref.set({
    globalShots: globalShots,
    deaths: deaths,
    variable3: variable3
  });
}

function sendVar3(variable3) {
  ref.set({
    variable3: variable3
  });
}

var3 = 1

// Listen for changes in the database
ref.on('value', function(snapshot) {
  var deaths = snapshot.child('deaths').val();
  document.getElementById("Tickerdeaths").innerText = "Global Deaths: " + deaths;

});
ref.on('value', function(snapshot) {
  var globalShots = snapshot.child('globalShots').val();
  document.getElementById("Tickershots").innerText = "Global Shots: " + globalShots;

});



// Call the function with the variables to save
var globalShots = 0;
var deaths = 0;
var variable3 = true;

// Define a function to get deaths from Firebase
function getDeathsData() {
    ref.once('value').then(function(snapshot) {
    var deaths = snapshot.child('deaths').val();
      console.log("deaths = " + deaths);
  });
}
// Define a function to send data of how many shots to Firebase
function sendShotToDatabase() {
  ref.once('value').then(function(snapshot) {
    var globalShots = snapshot.child('globalShots').val();
    var newglobalShots = globalShots + 1;
    ref.update({ globalShots: newglobalShots });

  });
}

function sendDeathsToDatabase() {
  ref.once('value').then(function(snapshot) {
    var deaths = snapshot.child('deaths').val();
    var newdeath = deaths + 1;
    ref.update({deaths: newdeath});
  });
}
/*
------RUSSIAN ROULLETTE PART-------
*/
var gunShot = new Audio('DryFire.mp3');
gunShot.loop = false;



i = 0;
x = 0;


function start() {
  // everytime i run the function i ++
  gunShot.play();
  i++;
sendShotToDatabase()

  document.getElementById("strzaly").innerText = "shots = " + (i )
  console.log("i = " + i)
  if (i < 2) {
    rndInt = Math.floor(Math.random() * 6) + 1;
  }
  
  if (rndInt == 1 || i == rndInt) {
    console.log("DEAD")
    sendDeathsToDatabase()
    
    i = 0
    window.location.href = "deathscreen.html";
  }
}

/*
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
CLOCK
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
*/
function updateTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const hourStr = String(hour).padStart(2, '0');
  const minuteStr = String(minute).padStart(2, '0');
  const secondStr = String(second).padStart(2, '0');
  const timeStr = `${hourStr}:${minuteStr}:${secondStr}`;
  document.querySelector('.time').textContent = timeStr;
}

updateTime();
setInterval(updateTime, 1000);
