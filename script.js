
//model
const app = document.getElementById("app");
let gridSizeY;
let gridSizeX;
let gridStyle;
let controllerstate = true;
let playerY = 3;
let playerX = 3;
let snow = [];
let playerMoney = 0;
let snowInterval;
let currentLevel;
let playerSprite = "img/player.png"
const levels = [
    {
        name: "Kapittel 1: Genesis",
        image: "img/intro.jpg",
        background: "url(img/hage.png)",
        gridsize: 6,
        description: /*HTML*/`Det er ein kald vinterkveld i 1992, Fridtjof sitter og tenker på den økonomiske tilstanden av verden vår.
        Han ender til slutt med å gå bort til far sin, og spør "Far, kvifor bryr den gjennomsnittlige mann seg meir om å bli rik, enn å spre kjærleik og vibes?" <br/>
        "Dumt spørsmål Fridtjof", svarer far. "Alle veit at det viktigste i livet er cash money. Du må slutte med det der hippie greiene dine. 
        Gå bort til bestemor di og måk litt snø for peng. So lærer du fort verdien av peng din ubrukelige dritt" <br/>
        Og med det starter Fridtjof sin reise gjennom kapitalismen.
        <br/> (Styr med piltastene)`,
        gridstyle: "repeat(6, 80px)",
        nestenivå: 100,
    },
    {
        name: "Kapittel 2: Kommunearbeid",
        image: "img/level2story.jpg",
        background: "url(img/parkeringsplass.png)",
        gridsize: 8,
        description: /*HTML*/`Etter å ha måkt all snøen og ruinert bestemor sin økonomi, føler Fridtjof at han fortsatt ikkje har lært noe. Men når han går heim etter ein
        lang dags arbeid ser han ein jobbplakat for kommunen. Han tenkjer kanskje det er dette han trenger, kanskje han endelig finner meiningen med vårt evig-økende kapitalistiske samfunn.
        `,
        gridstyle: "repeat(8, 60px)",
        nestenivå: 2000,
    },
    {
        name: "Kapittel 3: Berømmelse og forvirrelse",
        image: "img/avis.jpg",
        background: "url(img/illuminati.png)",
        gridsize: 10,
        description: /*HTML*/` Verden sine auger begynner å åpne seg for Fridtjof og hans snømåke eigenskapar, han vinner fleire prisar og får mykje presse. <br/>
            Men Fridtjof er fortsatt like forvirra, han har alt han treng av peng, men kapitalismen virker berre fjernare og fjernare. <br/>
            Ein dag får han ein telefon. "Eg har sett deg og eigenskapane dine", seier mannen på andre sida av telefonrøret. "Me kunne virkeligt trengt ein som deg i klubben vår".
            Fridtjof takker ja til dette tilbudet. Han møter 15 menn i svarte frakkar på klubbhuset, det er noko rart med dette, men Fridtjof satsar på at dette kan være riktig retning for å lære om kapitalismen.
        `,
        gridstyle: "repeat(10, 48px)",
        nestenivå: 50000,
    },
    {
        name: "Finale: Månemannen",
        image: "img/level4story.jpg",
        background: "url(img/Måne.png)",
        gridsize: 12,
        description: /*HTML*/` Etter å ha måkt det som virker som all snøen i verden, så slutter Fridtjof i klubben. Han syntest dei andre var litt for merkelige. <br/>
            Fridtjof gir nesten opp alt håp på å skjønne kvifor verden er så penge fokusert. Men då fekk han eit brev frå NASA: <br/>
            "Hei Fridtjof, me er veldig imponerte av dine snømåke ferdigheiter. Me har ein ledig snømåke plass på månen og vil gjerne du skal bli med oss. <br/>
            PS: Me kan lære deg om kapitalismen"  <br/>
            Fridtjof hoppar i været. Dette er det han har leita etter, endelig skal han få svara han har leit etter. Han setter seg på første romskip til månen og gjer klar snømåka
        `,
        gridstyle: "repeat(12, 40px)",
        nestenivå: 500000,
    },
    {
        name: "Penger",
        image: "img/ending.jpg",
        description: /*HTML*/`
            Imens Fridtjof står på månen og måker for harde livet høyrer han ei stemme bak han. "Hei du!", seier stemma. "Jeg har hørt at du leter meningen med penger". <br/>
            Fridjof skjønnar nesten ikkje kva mannen seier på grunn av den tjukke Oslo Vest dialekta. "Ja, det gjer eg", seier Fridtjof. Han spissar øyrene, endelig skal han få skjønne kva som er meiningen med alt dette.
            "Hør her", seier Mister Oslo Vest. <br/> "Det er simpelt, penger er lættis" <br/><br/><br/> Snipp snapp snute, så var Fridtjof's reise gjennom kapitalisme ute.
        `
    }
    
    

]


let upgrades = [
{   name: "Meir verdi",
    cost: 10,
    worth: 1,
    level: 0,
    image: "img/dollar.png",
    maxlevel: 1000,
},
{
    name: "Gull snø",
    cost: 50,
    worth: 1,
    level: 0,
    image: "img/gull.png",
    maxlevel: 10,
},
{
    name: "Meir snø",
    cost: 100,
    rate: 3000,
    level: 0,
    image: "img/meir.png",
    maxlevel: 10,
}
]

//sounds
let jaja = new Audio("sounds/jaja.mp3");
let meiningen = new Audio("sounds/meiningen.mp3");
let meirsnø = new Audio("sounds/meirsnø.mp3");
let pappa = new Audio("sounds/pappa.mp3");
let psh = new Audio("sounds/psh.mp3");
let snø = new Audio("sounds/snø.mp3");
let snørap = new Audio("sounds/snørap.mp3");
let snørapextended = new Audio("sounds/snørapextended.mp3");
let tiss = new Audio("sounds/tiss.mp3");
let woah = new Audio("sounds/woah.mp3");

//view
function startScreen() {
    app.innerHTML = /*HTML*/`
    <div class="overskrift">
        <h1>
            Fridtjof's reise gjennom kapitalismen
        </h1>
    </div>
    <div class="bilde">
        <img src="img/tenkerpenger.jpg">
    </div>
    <div id="startknapper">
        <div onclick="story(0)" class="knapp">Start Spel</div>
        <div onclick="credits()" class="knapp">Credits</div>
    </div>
    
    `
}
startScreen();


function story(level){
    if (level == 4) {
        app.innerHTML = /*HTML*/`
    <div class="overskrift">
    <h1>
        ${levels[level].name}
    </h1>
    <div class="bilde">
        <img src=${levels[level].image}>
        <div class="bildeogbeskrivelse">
            <h3 class="beskrivelse">${levels[level].description}
            </h3>
            <div onclick="end()" class="knapp">Gå videre</div>
        </div>
    </div>
    </div>
    `
    } else {
    app.innerHTML = /*HTML*/`
    <div class="overskrift">
    <h1>
        ${levels[level].name}
    </h1>
    <div class="bilde">
        <img src=${levels[level].image}>
        <div class="bildeogbeskrivelse">
            <h3 class="beskrivelse">${levels[level].description}
            </h3>
            <div onclick="startLevel(${level})" class="knapp">Start nivå</div>
        </div>
    </div>
    </div>
    `
}
}

function startLevel(level) {
    gridSizeX = levels[level].gridsize;
    gridSizeY = levels[level].gridsize;
    gridStyle = levels[level].gridstyle;
    snow = [];
    currentLevel = level;
    updateView();
    gameTimer();
}

function credits() {
    app.innerHTML = /*HTML*/`
        <div class="overskrift">
        <h1>
            Credits
        </h1>
        <div class="bilde">
            <img src="img/tenkerpenger.jpg">
            <div class="bildeogbeskrivelse">
                <h3 class="beskrivelse">
                Laget av Frode Offerdal Jakobsen <br/>
                Pixelart av Frode Offerdal Jakobsen<br/>
                Front-end Development av Frode Offerdal Jakobsen<br/>
                Back-end Development av Frode Offerdal Jakobsen<br/>
                Voice Acting av Frode Offerdal Jakobsen <br/>
                Bilder generert av Kunstig Intelligens via Bing Copilot<br/>

                
                <div onclick="startScreen()" class="knapp">Tilbake til meny</div>
            </div>
        </div>
        </div>
    `
}

function updateView() {
    app.innerHTML = /*HTML*/`
        <div id="containercontainer">
            <div id="container"></div>
        </div>
        <div id="penger">
        <h3>Peng: ${playerMoney}</h3>
        </div>
        <div id="upgrades">
            ${displayUpgrades(0)}
            ${displayUpgrades(1)}
            ${displayUpgrades(2)}
        </div>
        <div class="nivåknappdiv">${sjekkNivå()}</div>

    `
    let container = document.getElementById("container")
    container.style.gridTemplateColumns = gridStyle;
    container.style.gridTemplateRows = gridStyle;
    container.style.backgroundImage = levels[currentLevel].background;
    genGrid();
    updatePlayer();
    updateSnow();
    checkCollision();
}

function displayUpgrades(upgrade) {
    let color;
    if (playerMoney >= upgrades[upgrade].cost) {
        color = "blue";
    } else{color = "grey"}

    if (upgrades[upgrade].level < upgrades[upgrade].maxlevel) {
    return /*HTML*/`
        <div style="background-color: ${color}" onclick="upgrade(${upgrade})">
        <h3>${upgrades[upgrade].cost} <br/>
        ${upgrades[upgrade].name}</h3>
        <h3>Nivå: ${upgrades[upgrade].level}</h3>
        <img class="upgradebilde" src=${upgrades[upgrade].image}>
        </div>
    `
} else {
    return /*HTML*/`
        <div style="background-color: grey">
        <h3><br/>
        ${upgrades[upgrade].name}</h3>
        <h3>Max Level</h3>
        <img class="upgradebilde" src=${upgrades[upgrade].image}>
        </div>
    `
}
}


function genGrid() {
    const container = document.getElementById("container")
    for (let y = 0; y < gridSizeY; y++) {
        for (let x = 0; x < gridSizeX; x++) {
            container.innerHTML += /*HTML*/` 
                <div id="y${y}x${x}"></div>
            `
        }
    }
}


function updatePlayer() {
    const positionID = "y" + playerY + "x" + playerX;
    document.getElementById(positionID).innerHTML = /*HTML*/`
        <img id="player" src=${playerSprite}>`

}

//lager snø, går på timer
function makeSnow() {
    
    let randomX, randomY;
    randomX = Math.floor(Math.random() * (gridSizeX))
    randomY = Math.floor(Math.random() * (gridSizeY)) 

    let randomTall = Math.floor(Math.random() * 100)
    if (randomTall < upgrades[1].worth) {
        snow.push({type: "gold", snowY: randomY, snowX: randomX});
    } else {
    snow.push({type: "snow", snowY: randomY, snowX: randomX});
}
    updateView();
    
}

function gameTimer(){
clearInterval(snowInterval);
snowInterval = setInterval(makeSnow, upgrades[2].rate);
}


//for løkke som viser fram snøen hvert updateView
function updateSnow() {
    let snowPosition;
    for (let i = 0; i < snow.length; i++) {
        snowPosition = "y" + snow[i].snowY + "x" + snow[i].snowX;
        if (snow[i].type == "snow") {
        document.getElementById(snowPosition).style.backgroundColor = "white";
    } else if (snow[i].type == "gold") {
        document.getElementById(snowPosition).style.backgroundColor = "yellow";
    }
    }
    
}


function end() {
    app.innerHTML = /*HTML*/`
        <div class="overskrift">
        <h1>
            THE END
        </h1>
        <div class="bilde">
            <img src="img/gammel.jpg">
            <div class="bildeogbeskrivelse">
                <h3 class="beskrivelse">
                Laget av Frode Offerdal Jakobsen <br/>
                Pixelart av Frode Offerdal Jakobsen<br/>
                Front-end Development av Frode Offerdal Jakobsen<br/>
                Back-end Development av Frode Offerdal Jakobsen<br/>
                Voice Acting av Frode Offerdal Jakobsen <br/>
                Bilder generert av Kunstig Intelligens via Bing Copilot<br/>
            </div>
        </div>
        </div>
    `
    snørapextended.play();
}


//controller

document.addEventListener("keydown", event => {
    if (event.key.startsWith("Arrow") && controllerstate) {
        
        switch(event.key) {
            case "ArrowLeft":
                if (playerX > 0) {
                    playerX--;
                    playerSprite = "img/playerLeft.png"
                    controllerstate = false;
                    setTimeout(changeState, 100);
                    updateView();
                }
                break;
            case "ArrowRight":
                if (playerX < gridSizeX - 1) {
                    playerX++;
                    playerSprite = "img/player.png"
                    controllerstate = false;
                    setTimeout(changeState, 100);
                    updateView()
                }
                break;
            case "ArrowUp":
                if (playerY > 0) {
                    playerY--;
                    controllerstate = false;
                    setTimeout(changeState, 100);
                    updateView();
                }
                break;
            case "ArrowDown":
                if (playerY < gridSizeY - 1) {
                    playerY++;
                    controllerstate = false;
                    setTimeout(changeState, 100);
                    updateView();
                }
                break;
        }
    }
})

function changeState() {
    controllerstate = true;
}

function upgrade(index) {
    if (playerMoney >= upgrades[index].cost) {
        playerMoney = playerMoney - upgrades[index].cost;
        if (index == 2) {
            upgrades[index].rate = upgrades[index].rate / 1.10;
            upgrades[index].cost = upgrades[index].cost * 1.8;
            gameTimer();
            meirsnø.play();
        } else if (index == 0) {
        upgrades[index].worth = Math.ceil(upgrades[index].worth * 1.3);
        upgrades[index].cost = upgrades[index].cost / 2 * 2.718;
        woah.play();
    } else {
        upgrades[index].worth = Math.ceil(upgrades[index].worth * 1.3);
        upgrades[index].cost = upgrades[index].cost * 1.8;
        tiss.play();
    }
        upgrades[index].level++;
        playerMoney = Math.floor(playerMoney)
        upgrades[index].cost = Math.floor(upgrades[index].cost)
        updateView();
    }
}

function sjekkNivå(){
    let nestenivå = levels[currentLevel].nestenivå - playerMoney;
    if (nestenivå > 0) {
    return /*HTML*/`
        <div class="nivåknapp">${nestenivå} peng til neste nivå </div>`
    } else {
    return /*HTML*/`
        <div onclick="story(${currentLevel + 1}), stopTimer()" class="knapp">Gå til neste nivå!</div>`
    }
}

function stopTimer(){
    clearInterval(snowInterval);
}

function checkCollision(){
    for (let i = 0; i < snow.length; i++) {
        if (playerX == snow[i].snowX && playerY == snow[i].snowY) {
            if (snow[i].type == "snow") {
            playerMoney += upgrades[0].worth;
            sound();
        } else if (snow[i].type == "gold") {
            playerMoney += upgrades[0].worth * 5;
            sound();
        }
            snow.splice(i, 1)
            updateView();
        }
    }
}

function sound() {
    let randomNumber = Math.floor(Math.random() * 200)

            if (randomNumber > 0 && randomNumber < 5) {
                jaja.play()
            } else if (randomNumber == 6) {
                meiningen.play()
            } else if (randomNumber == 7) {
                pappa.play()
            } else if (randomNumber > 8 && randomNumber < 13) {
                snø.play()
            } else if (randomNumber == 14) {
                snørap.play()
            } else if (randomNumber == 15) {
                woah.play()
            } else if (randomNumber > 15 && randomNumber < 30) {
                psh.play()
            }
}