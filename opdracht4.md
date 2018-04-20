# Opdracht 4 - De avatar animeren

[Volgende opdracht](opdracht5.md) - [Vorige opdracht](opdracht3.md) - [Uitleg](README.md)

De avatar beweegt nu op commando, maar hij ziet er nog wel een beetje als een houten Klaas uit, vind je niet? Daar ga je in deze opdracht iets aan doen.

## Acrobatiek uit de `animate` functie halen

Je gaat in deze opdracht de armen en benen van de avatar heen en weer bewegen als de avatar loopt. Maar om dat te doen moet je de `animate` functie aanpassen. Omdat daar nu al de code in staat voor de acrobatiek (salto's en flips) zou die functie een beetje onoverzichtelijk worden. Daarom ga je eerst die acrobatiek er uit halen en in zijn eigen functie zetten.

Pas de `animate` functie aan:

<pre><code>function animate() {
  requestAnimationFrame(animate);
  <b>acrobatics();</b>
  renderer.render(scene, camera);
}
animate();</code></pre>

En voeg de volgende code toe, direct onder de regel `animate();`:

```
var is_cartwheeling = false;
var is_flipping = false;
function acrobatics() {
  if (is_cartwheeling) {
    avatar.rotation.z = avatar.rotation.z + 0.05;
  }
  if (is_flipping) {
    avatar.rotation.x = avatar.rotation.x + 0.05;
  }
}
```

Dit doet exact hetzelfde als wat je al had, maar nu kunnen we de loop-animatie toevoegen zonder dat het een rotzooi wordt.

## Animatie voor de rechter hand toevoegen

Om te beginnen ga je alleen de rechter hand animeren.

Voeg eerst de volgende regel toe, direct boven de `animate` functie:

```
var clock = new THREE.Clock(true);
```

Dit voegt een klok toe, zodat je animaties op basis van de verstreken tijd kunt maken, zoals je in opdracht 1 ook al hebt gedaan.

Voeg nu de volgende code toe, direct onder de regel `animate();`:

```
function walk() {
  var position = Math.sin(clock.getElapsedTime() * 5) * 50;
  right_hand.position.z = position;
}
```

Met de functie `Math.sin` kun je een slinger beweging simuleren. Als je een steeds groter getal in deze functie stopt (wat je doet omdat `getElapsedTime` steeds groter wordt, er is namelijk steeds meer tijd verstreken) dan zal `Math.sin` eerst steeds groter worden, daarna weer steeds kleiner, enzovoort. Als je het resultaat van deze functie dus gebruikt om de positie van de rechter hand te bepalen, dan krijg je dus het idee dat deze heen en weer beweegt tijdens het lopen.

Nu moet je de `walk` functie alleen nog aanroepen om de animatie te zien.

Pas de `animate` functie aan:

<pre><code>function animate() {
  requestAnimationFrame(animate);
  <b>walk();</b>
  acrobatics();
  renderer.render(scene, camera);
}
animate();</code></pre>

> **Probeer het zelf:** Probeer je spel nu uit om de animatie van de hand te zien. Experimenteer met de waarden **5** en **50** om een idee te krijgen wat ze doen. Kies vervolgens waarden die jij mooi vind.

## Animatie voor de rest toevoegen

Als je tevreden bent over de animatie van de hand, dan kan je de rest van de ledematen animeren. Lukt je dit zelf zonder hieronder te spieken? Tip: Als de rechter hand naar voren gaat, dan moet de linker hand naar achteren gaan. En meestal bewegen de armen en benen kruislings, dus rechter hand naar voren samen met het linker been.

Pas (als je dat nog niet gelukt is) de `walk` functie aan:

<pre><code>function walk() {
  var position = Math.sin(clock.getElapsedTime() * 5) * 50;
  right_hand.position.z = position;
  <b>left_hand.position.z = -position;
  right_foot.position.z = -position;
  left_foot.position.z = position;</b>
}</code></pre>

## Loop-animatie alleen uitvoeren tijdens het lopen

Je hebt nu een mooie loop-animatie gemaakt, maar op dit moment staat deze animatie altijd aan. Het is uiteraard de bedoeling dat de animatie alleen aan staat als je avatar ook werkelijk beweegt.

Pas daarvoor eerst de `walk` functie aan:

<pre><code>function walk() {
  <b>if (!isWalking()) return;</b>
  var position = Math.sin(clock.getElapsedTime() * 5) * 50;
  right_hand.position.z = position;
  left_hand.position.z = -position;
  right_foot.position.z = -position;
  left_foot.position.z = position;
}</code></pre>

Als de `isWalking` functie (die je nog moet maken) **niet** `true` teruggeeft, dan wordt de regel `return;` uitgevoerd. Dit betekent dat de `walk` functie meteen op houd en dus niet langer de positie van de handen en voeten aanpast.

Voeg nu deze `isWalking` functie toe, direct na de `acrobatics` functie:

```
var is_moving_right, is_moving_left, is_moving_forward, is_moving_back;
function isWalking() {
  if (is_moving_right) return true;
  if (is_moving_left) return true;
  if (is_moving_forward) return true;
  if (is_moving_back) return true;
  return false;
}
```

Als &eacute;&eacute;n van de variabelen `is_moving_right`, `is_moving_left`, `is_moving_forward` of `is_moving_back` de waarde `true` heeft, dan zal de `isWalking` functie ook `true` terug geven. Anders geeft de functie `false` terug.

Nu moet je alleen nog zorgen dat de 4 `is_moving_` variabelen de juiste waarde krijgen.

Pas daarvoor de `addEventListener` code aan:

<pre><code>document.addEventListener('keydown', function(event) {
  var code = event.keyCode;
  var speed = 15;

  if (code == 37) <b>{</b> // pijltje naar links
    marker.position.x = marker.position.x - speed;
    <b>is_moving_left = true;</b>
  <b>}</b>
  if (code == 38) <b>{</b> // pijltje omhoog
    marker.position.z = marker.position.z - speed;
    <b>is_moving_forward = true;</b>
  <b>}</b>
  if (code == 39) <b>{</b> // pijltje naar rechts
    marker.position.x = marker.position.x + speed;
    <b>is_moving_right = true;</b>
  <b>}</b>
  if (code == 40) <b>{</b> // pijltje omlaag
    marker.position.z = marker.position.z + speed;
    <b>is_moving_back = true;</b>
  <b>}</b>

  if (code == 67) is_cartwheeling = !is_cartwheeling; // C
  if (code == 70) is_flipping = !is_flipping; // F
});</code></pre>

Nu wordt de juiste `is_moving_` variabele ingesteld als je op een pijltjestoets drukt. Helaas is dit nog niet genoeg, want als je eenmaal op een pijltjestoets hebt gedrukt wordt de `is_moving_` variabele nooit meer op `false` gezet. Na het eerst pijltje dat je indrukt zal de avatar dus weer constant in de loop-animatie blijven.

Om dit op te lossen moet je nog een tweede `addEventListener` toevoegen, maar nu voor het `keyup` event (dus het loslaten van een toets).

Voeg de volgende code toe, helemaal onderaan `index.js`:

```
document.addEventListener('keyup', function(event) {
  var code = event.keyCode;
  
  if (code == 37) is_moving_left = false;
  if (code == 38) is_moving_forward = false;
  if (code == 39) is_moving_right = false;
  if (code == 40) is_moving_back = false;
});
```

Nu werkt de loop-animatie alleen maar zolang je een van de pijltjestoetsen indrukt. Maar de avatar blijft nog wel steeds in dezelfde richting staan, welk pijltje je ook indrukt. Dat probleem ga je in de volgende opdracht oplossen.

[Volgende opdracht](opdracht5.md) - [Vorige opdracht](opdracht3.md) - [Uitleg](README.md)
