# Opdracht 7 - Fruit Hunt

[Vorige opdracht](opdracht6.md) | [Uitleg](README.md)

In deze laatste opdracht (😭) maak je het spel af door de speler een doel te geven om zijn avatar te bewegen en hem tegelijk te laten weten hoeveel punten hij heeft gescoord. En om het helemaal af te maken ga je ook nog een geluidje toevoegen als de speler punten scoort.

## Een scorebord toevoegen

Om te beginnen ga je een scorebord toevoegen. Dit is eenvoudig omdat er al een scorebord aan het project is toegevoegd, je hoeft hem alleen maar aan te roepen.

Voeg eerst de volgende code toe, direct onder de regel `var not_allowed = [];`:

```
var scoreboard = new Scoreboard();
scoreboard.countdown(45);
scoreboard.score();
```

Hiermee maak je een nieuw scorebord, stelt de maximum speeltijd in op **45** seconden, en vertelt de webbrowser om de huidige score weer te geven.

Voeg direct onder de vorige drie regels het volgende toe:

```
scoreboard.help(
  'Gebruik de pijltjes om te bewegen; ' +
  'Spring met spatiebalk om het fruit te vangen; ' +
  'Zoek naar schuddende bomen met fruit. ' +
  'Ga naar de boom en spring voordat het fruit verdwijnt!'
);
```

Hiermee voeg je wat instructies toe voor de speler die hij kan bekijken door `?` in te drukken op het toetsenbord.

Voeg nu, weer direct onder de vorige code, deze code toe:

```
scoreboard.onTimeExpired(function () {
  scoreboard.message("Game Over!");
});
```

Dit zorgt er voor dat er een "Game Over!" bericht in het scorebord komt te staan als de tijd verstreken is (de **45** seconden die je boven hebt ingesteld).

## Schudden met die bomen

De manier waarop de speler punten kan scoren is door op het juiste moment naar een van de bomen te lopen en te springen om fruit te vangen. Maar dan moet hij wel weten naar welke boom hij moet lopen.

Om de speler duidelijk te maken welke boom rijp fruit heeft om te plukken, ga je elke paar seconden een willekeurige boom laten schudden. Maar daarvoor moet je eerst de code die bomen maakt een beetje aanpassen.

Vervang de volgende 4 regels:

```
makeTreeAt(500, 0);
makeTreeAt(-500, 0);
makeTreeAt(750, -1000);
makeTreeAt(-750, -1000);
```

door:

```
var tree_with_treasure;
var trees = [];
trees.push(makeTreeAt( 500, 0));
trees.push(makeTreeAt(-500, 0));
trees.push(makeTreeAt( 750, -1000));
trees.push(makeTreeAt(-750, -1000));
```

Dit voegt twee variabelen toe: `tree_with_treasure`, waarin je kan opslaan welke boom je willekeurig hebt gekozen om fruit te geven, en `trees`, waarin je alle bomen opslaat zodat je er een uit kan kiezen.

Er is alleen een probleem met deze code: `makeTreeAt` maakt wel een boom aan, maar geeft niks terug. Pas daarom de `makeTreeAt` functie als volgt aan:

<pre><code>function makeTreeAt(x, z) {
  var trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(50, 50, 200),
    new THREE.MeshBasicMaterial({color: 0xA0522D})
  );

  var top = new THREE.Mesh(
    new THREE.SphereGeometry(150),
    new THREE.MeshBasicMaterial({color: 0x228B22})
  );
  top.position.y = 175;
  trunk.add(top);

  var boundary = new THREE.Mesh(
    new THREE.CircleGeometry(300),
    new THREE.MeshNormalMaterial()
  );
  boundary.position.y = -100;
  boundary.rotation.x = -Math.PI/2;
  trunk.add(boundary);

  not_allowed.push(boundary);

  trunk.position.set(x, -75, z);
  scene.add(trunk);

  <b>return top;</b>
}</code></pre>

Nu geeft de `makeTreeAt` functie de groene boomtop terug, zodat deze in de `trees` lijst kan worden bewaard. Nu kan je een boom uitkiezen om te laten schudden.

Voeg, direct onder de `makeTreeAt` functie, de volgende code toe:

```
function shakeTree() {
  tree_with_treasure = Math.floor(Math.random() * trees.length);
  new TWEEN
    .Tween({ x: 0 })
    .to({ x: 2 * Math.PI }, 200)
    .repeat(20)
    .onUpdate(function () {
      trees[tree_with_treasure].position.x = 75 * Math.sin(this.x);
    })
    .start();
  setTimeout(shakeTree, 12 * 1000);
}
shakeTree();
```

De `shakeTree` functie is weer een functie die zichzelf constant aanroept, net zoals de `animate` functie. Dit noemen programmeurs een `recursive` functie. Maar in deze functie wil je niet dat hij zichzelf zo snel mogelijk aanroept, zoals je in de `animate` functie deed met `requestAnimationFrame`, maar pas na een vastgestelde hoeveelheid tijd (**12 * 1000** milliseconden, of **12** seconden, in de `setTimeout` functie).

Maar voordat de functie zichzelf weer aanroept kies je eerst een willekeurige boom uit. `Math.random()` geeft je een willekeurig getal tussen **0** en **1**. Als je dit vermenigvuldigt met het aantal bomen (`trees.length`) krijg je een getal tussen **0** en **4**. Maar dat kan bijvoorbeeld ook **2.3647** zijn (maar nooit **4.0**, hooguit **3.9999...**). Om te zorgen dat er alleen maar **0**, **1**, **2**, of **3** uitkomt kun je met `Math.floor` alles achter de komma weggooien.

Vervolgens maak je met `TWEEN.js` weer een animatie, zoals je ook al hebt gedaan om de avatar soepel te laten draaien. Hier zit weinig nieuws in, maar er staan wel een hoop getallen in. Speel vooral eens met alle getallen om een idee te krijgen wat ze doen.

Wat wel nieuw is aan de animatie is de regel `.repeat(20)`. Dit zorgt ervoor dat de animatie exact **20** keer wordt herhaald.

## Fruit vangen

Om fruit te vangen moet de speler springen. Pas daarom de `keydown` `eventListener` als volgt aan:

<pre><code>document.addEventListener('keydown', function (event) {
  var code = event.keyCode;
  var speed = 15;

  <b>if (code == 32) jump(); // spatiebalk</b>

  if (code == 37) { // pijltje naar links
    marker.position.x = marker.position.x - speed;
    is_moving_left = true;
  }
  if (code == 38) { // pijltje omhoog
    marker.position.z = marker.position.z - speed;
    is_moving_forward = true;
  }
  if (code == 39) { // pijltje naar rechts
    marker.position.x = marker.position.x + speed;
    is_moving_right = true;
  }
  if (code == 40) { // pijltje omlaag
    marker.position.z = marker.position.z + speed;
    is_moving_back = true;
  }
  if (code == 67) is_cartwheeling = !is_cartwheeling; // C
  if (code == 70) is_flipping = !is_flipping; // F

  if (detectCollisions()) {
    if (is_moving_left) marker.position.x = marker.position.x + 5;
    if (is_moving_right) marker.position.x = marker.position.x - 5;
    if (is_moving_forward) marker.position.z = marker.position.z + 5;
    if (is_moving_back) marker.position.z = marker.position.z - 5;
  }
});</code></pre>

Als de gebruiker de spatiebalk indrukt, dan roep je een nieuwe functie, `jump`, aan.

Voeg nu deze nieuwe `jump` functie toe, helemaal onderaan `index.js`:

```
function jump() {
  checkForTreasure();
  animateJump();
}
```

Deze functie doet niets meer dan twee andere functies aanroepen: `checkForTreasure`, die zal controleren of de avatar dicht genoeg bij de juiste boom is, en `animateJump`, die ervoor zal zorgen dat de sprong er mooi en realistisch uitziet.

Voeg eerst de `checkForTreasure` functie toe, onder de `jump` functie:

```
function checkForTreasure() {
  if (tree_with_treasure == undefined) return;
  var treasure_tree = trees[tree_with_treasure],
    p1 = treasure_tree.parent.position,
    p2 = marker.position;
  var distance = Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) +
    (p1.z - p2.z) * (p1.z - p2.z)
  );
  if (distance < 500) {
    scorePoints();
  }
}
```

Hier wordt de positie bepaald van de boom met fruit (`p1`) en van de avatar (`p2`). Vervolgens wordt een wiskundige formule gebruikt om de afstand tussen die twee punten te bepalen. Als de speler dicht genoeg bij de boom is (`distance < 500`) dan krijgt hij punten!

In feite had je, om te bepalen of je dicht genoeg bij de boom bent, dezelfde logica kunnen gebruiken als in de `detectCollisions` functie. Of omgekeerd had je in de `detectCollisions` deze logica kunnen gebruiken. Maar op deze manier heb je twee verschillende manieren gezien om een vergelijkbaar probleem op te lossen.

Terug naar de punten die de speler krijgt. Voeg de volgende code toe, onder de `checkForTreasure` functie:

```
function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
}
```

Elke keer als de speler fruit vangt, dan krijgt hij **10** punten, maar alleen als er nog tijd op het scorebord staat!

Voeg, onder de `scorePoints` functie, nu de `animateJump` functie toe:

```
function animateJump() {
  new TWEEN
    .Tween({ jump: 0 })
    .to({ jump: Math.PI }, 500)
    .onUpdate(function () {
      marker.position.y = 200 * Math.sin(this.jump);
    })
    .start();
}
```

In deze `TWEEN.js` staat niets nieuws, behalve dan wat andere getallen. Pas weer naar eigen inzicht de getallen aan om een idee te krijgen wat ze doen en om de animatie naar jou smaak af te stellen.

## Geluid toevoegen

Net als het scorebord is er voor geluid ook al iets aan het project toegevoegd. Pas de `scorePoints` functie aan om een geluid af te spelen als de speler punten scoort:

<pre><code>function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
  <b>Sounds.bubble.play();</b>
}</code></pre>

In de `sounds` folder staan nog meer geluiden. Pas in bovenstaande code `bubble` aan door de naam van het geluid (zonder .mp3) om jouw favoriete geluid af te spelen als de speler punten scoort.

## Fruit animeren

Het spel is nu in feite af, maar om het nog een beetje leuker te maken kan je nog een animatie toevoegen op het moment dat de speler fruit vangt.

Pas nogmaals de `scorePoints` functie aan:

<pre><code>function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
  Sounds.bubble.play();
  <b>animateFruit();</b>
}</code></pre>

Als de speler punten scoort wordt er naast het afspelen van een geluid ook een `animateFruit` functie aangeroepen.

Voeg nu tot slot deze `animateFruit` functie toe, onder de `scorePoints` functie:

```
var fruit;
function animateFruit() {
  if (fruit) return;
  fruit = new THREE.Mesh(
    new THREE.CylinderGeometry(25, 25, 5, 25),
    new THREE.MeshBasicMaterial({ color: 0xFFD700 })
  );
  fruit.rotation.x = Math.PI / 2;
  marker.add(fruit);
  new TWEEN
    .Tween({
      height: 150,
      spin: 0
    })
    .to({
      height: 250,
      spin: 4
    }, 500)
    .onUpdate(function () {
      fruit.position.y = this.height;
      fruit.rotation.z = this.spin;
    })
    .onComplete(function () {
      marker.remove(fruit);
      fruit = undefined;
    })
    .start();
}
```

De regel `if (fruit) return;` zorgt ervoor dat de animatie niet nog een keer gestart wordt als hij al bezig is.

Het object `fruit` is wat programmeurs een "wegwerp"-object noemen. Het bestaat alleen maar zolang de animatie het nodig heeft. Als de animate klaar is (`onComplete`), wordt het weer weggegooid. Daarom kan je controleren of de animatie bezig is door te controleren of `fruit` bestaat.

> **Probeer het zelf:** Als het goed is kun je alles wat in de `animateFruit` functie gebeurd redelijk volgen, want het zijn allemaal dingen die je in deze en voorgaande opdrachten al eerder hebt gedaan. Kan je bedenken hoe het `fruit`-object en de animatie er uit zien voordat je het spel gaat spelen?

[Vorige opdracht](opdracht6.md) | [Uitleg](README.md)
