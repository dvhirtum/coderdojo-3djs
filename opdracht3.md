# Opdracht 3 - De avatar besturen

[Volgende opdracht](opdracht4.md) | [Vorige opdracht](opdracht2.md) | [Uitleg](README.md)

In deze opdracht ga je de avater laten bewegen met de pijltjestoetsen en, om er voor te zorgen dat je de beweging goed kan zien, ga je ook wat extra objecten tekenen: bomen!

## Bewegen met pijltjestoetsen

Voeg de volgende code toe, helemaal onderaan `index.js`:

```
document.addEventListener('keydown', function(event) {
  var code = event.keyCode;
  var speed = 15;

  if (code == 37) avatar.position.x = avatar.position.x - speed; // pijltje naar links
  if (code == 38) avatar.position.z = avatar.position.z - speed; // pijltje omhoog
  if (code == 39) avatar.position.x = avatar.position.x + speed; // pijltje naar rechts
  if (code == 40) avatar.position.z = avatar.position.z + speed; // pijltje omlaag
});
```

Met de code `document.addEventListener` vertellen we de webbrowser dat we willen reageren als de gebruiker een bepaalde actie uitvoert, in dit geval de actie `keydown`, wat betekent: "het indrukken van een knop op het toetsenbord". Alle code tussen de accolades ("{" en "}") wordt dus uitgevoerd iedere keer dat de gebruiker een toets indrukt.

Je kan achterhalen welke toets de gebruiker heeft ingedrukt met de code `event.keyCode`. Dit geeft je een numerieke code terug welke overeenkomt met een bepaalde toets. De pijltjestoetsen hebben de codes **37** tot en met **40**.

Nu kun je de avatar laten bewegen door de positie in een bepaalde richting te veranderen op basis van welk pijltje ingedrukt wordt. Hoeveel je de positie verandert hangt af van de waarde van `speed`: een hogere waarde betekent dat je avatar sneller beweegt.

## De animatie(s) starten en stoppen

In opdracht 2 heb je een salto-animatie toegevoegd, maar de enige manier om deze animatie aan of uit te zetten is door de `is_cartwheeling` waarde te veranderen van `true` naar `false` of omgekeerd. Dat ga je nu veranderen.

Pas om te beginnen de `animate` functie als volgt aan:

<pre><code>var is_cartwheeling = false;
<b>var is_flipping = false;</b>
function animate() {
  requestAnimationFrame(animate);
  if (is_cartwheeling) {
    avatar.rotation.z = avatar.rotation.z + 0.05;
  }
  <b>if (is_flipping) {
    avatar.rotation.x = avatar.rotation.x + 0.05;
  }</b>
  renderer.render(scene, camera);
}
animate();</code></pre>

Dit voegt een extra "flip"-animatie toe. Want, waarom niet 😉?

Pas vervolgens de `addEventListener` code aan:

<pre><code>document.addEventListener('keydown', function(event) {
  var code = event.keyCode;
  var speed;

  if (code == 37) avatar.position.x = avatar.position.x - speed; // pijltje naar links
  if (code == 38) avatar.position.z = avatar.position.z - speed; // pijltje omhoog
  if (code == 39) avatar.position.x = avatar.position.x + speed; // pijltje naar rechts
  if (code == 40) avatar.position.z = avatar.position.z + speed; // pijltje omlaag

  <b>if (code == 67) is_cartwheeling = !is_cartwheeling; // C
  if (code == 70) is_flipping = !is_flipping; // F</b>
});</code></pre>

Nu kan de gebruiker de animaties zelf starten met de `c` of `f` toets.

Het uitroep-teken in de code (`!`) betekent: Draai de waarde om, dus als de waarde `true` was, dan wordt het nu `false` en omgekeerd.

## Bomen tekenen

Je avatar kan zich nu bewegen, maar wat heb je daar aan in een saaie, lege spelwereld. Om pas echt plezier van het rondrennen te hebben ga je nu wat nieuwe objecten toevoegen, namelijk bomen.

Voeg de volgende code toe, nadat je alle ledematen van de avatar hebt gemaakt, maar voor de `animate` functie:

```
makeTreeAt( 500, 0);
makeTreeAt(-500, 0);
makeTreeAt( 750, -1000);
makeTreeAt(-750, -1000);

function makeTreeAt(x, z) {
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

  trunk.position.set(x, -75, z);
  scene.add(trunk);
}
```

Omdat alle bomen er hetzelfde uitzien, maak je een functie `makeTreeAt` om eenvoudig meerdere bomen te maken. De eerste vier regels roepen deze functie aan om vier bomen te maken op verschillende posities.

In de `makeTreeAt` functie maak je een boom die bestaat uit twee onderdelen: de bruine boomstam (de `trunk`) en de groene boomtop (de `top`). Vervolgens stel je de positie in van de boom aan de hand van de parameters die zijn ingevoerd bij het aanroepen van de functie (`x` en `z`) en voeg je de boom toe aan de `scene`.

De kleuren in de code zien er misschien vreemd uit: `0xA0522D` voor bruin en `0x228B22` voor groen. Dat komt omdat `THREE.js` zogenaamde "hexadecimale" codes gebruikt voor kleuren. Gelukkig hoef je die codes niet allemaal uit je hoofd te leren, want op internet zijn er genoeg plekken waar je ze kan achterhalen, zoals [hier](https://www.webpagefx.com/web-design/color-picker/).

## De camera en avatar samen bewegen

Het valt je misschien op dat je de avatar nu wel kunt bewegen, maar voor je het weet loopt hij zo het scherm uit! Om dat te voorkomen kan je de camera vastmaken aan de avatar.

Voeg de volgende regel toe, net voor de 4 `makeTreeAt` regels:

```
avatar.add(camera);
```

Nu beweegt de camera ook mee als je de avatar beweegt. Helaas werkt dit nog niet vlekkeloos. Probeer namelijk maar eens om de animaties te starten.

## Probleem met animaties oplossen

Als je de animatie aanzet, dan blijft je avatar stilstaan terwijl de spelwereld om hem heen beweegt! Dat komt omdat je de camera aan de avatar hebben toegevoegd en dat deze dus mee roteert. 

Om dat op te lossen ga je een nieuw object toevoegen waarmee je de camera en avatar aan elkaar kunnen koppelen, maar waarmee je nog steeds de avatar los van de camera kan roteren.

Voeg de volgende code toe, direct onder de regel `// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********`:

```
var marker = new THREE.Object3D();
scene.add(marker);
```

Zoek nu de volgende twee regels code op (let op: ze staan niet bij elkaar zoals hieronder):

```
scene.add(avatar);
avatar.add(camera);
```

en vervang ze door:

<pre><code><b>marker</b>.add(avatar);
<b>marker</b>.add(camera);</code></pre>

Pas tot slot de `addEventListener` code aan:

<pre><code>document.addEventListener('keydown', function(event) {
  var code = event.keyCode;
  var speed = 15;

  if (code == 37) <b>marker</b>.position.x = <b>marker</b>.position.x - speed; // pijltje naar links
  if (code == 38) <b>marker</b>.position.z = <b>marker</b>.position.z - speed; // pijltje omhoog
  if (code == 39) <b>marker</b>.position.x = <b>marker</b>.position.x + speed; // pijltje naar rechts
  if (code == 40) <b>marker</b>.position.z = <b>marker</b>.position.z + speed; // pijltje omlaag

  if (code == 67) is_cartwheeling = !is_cartwheeling; // C
  if (code == 70) is_flipping = !is_flipping; // F
});</code></pre>

Nu beweeg je het `marker` object met de pijltjestoetsen en omdat je zowel de `avatar` als de `camera` aan dat `marker` object hebt gekoppeld bewegen ze samen mee.

Maar omdat je de rotatie in de `animate` functie niet hebt aangepast (die roteert nog steeds de `avatar`) zal de camera nu stil blijven en lijkt het niet meer of de spelwereld mee draait.

[Volgende opdracht](opdracht4.md) | [Vorige opdracht](opdracht2.md) | [Uitleg](README.md)
