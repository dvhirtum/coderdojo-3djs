# Opdracht 5 - de avatar draaien

[Volgende opdracht](opdracht6.md) - [Vorige opdracht](opdracht4.md) - [Uitleg](README.md)

In de vorige opdracht heb je een loop-animatie toegevoegd als je de avatar beweegt, maar die animatie ziet er wel erg vreemd uit als de avatar niet ook draait in de richting waarin hij loopt. In deze opdracht ga je dat toevoegen.

## De avatar draaien

Om de avatar te draaien ga je een nieuwe functie toevoegen, genaamd `turn`.

Pas om te beginnen de `animate` functie aan om de `turn` functie aan te roepen:

<pre><code>function animate() {
  requestAnimationFrame(animate);
  walk();
  <b>turn();</b>
  acrobatics();
  renderer.render(scene, camera);
}
animate();</code></pre>

Nu moet je de `turn` functie nog implementeren. Voeg de volgende code toe, onder de `acrobatics` functie:

```
function turn() {
  var direction = 0;
  if (is_moving_forward) direction = Math.PI;
  if (is_moving_back) direction = 0;
  if (is_moving_right) direction = Math.PI/2;
  if (is_moving_left) direction = -Math.PI/2;

  avatar.rotation.y = direction;
}
```

Je gebruikt dezelfde 4 `is_moving_` variabelen die je in de vorige opdracht hebt toegevoegd om te bepalen of de loop-animatie moet afspelen of niet. Afhankelijk van in welke richting je op loopt pas je de waarde van `direction` aan. Daarvoor gebruik je een constante, `Math.PI`. Dit is een getal dat overeenkomt met de halve omtrek van een cirkel als de straal van de cirkel gelijk is aan **1**. In de ontwikkeling van spellen wordt het vaak gebruikt om een halve draai om een as aan te tonen, zoals hier. En `Math.PI/2` is dan dus een kwart draai.

## De draai animeren

Als je nu het resultaat bekijkt in de andere tab, dan zul je zien dat de avatar draait in de richting waarin hij loopt. Maar de draai is wel heel abrupt. Zo het niet mooi zijn als je de draai zelf ook zou kunnen animeren?

Daarvoor kunnen we een tweede **library** gebruiken, genaamd `TWEEN.js`. Deze **library** maakt het makkelijker om animaties te maken. In plaats van dat je elke wijziging van positie of rotatie precies moet berekenen, zoals we tot nu toe hebben gedaan, kan je `TWEEN.js` dat voor je laten doen. Je geeft simpelweg een beginwaarde en een eindwaarde op en je verteld `TWEEN.js` in hoeveel tijd hij de waarde van die beginwaarde naar de eindwaarde moet veranderen.

Klinkt het ingewikkeld? Hopelijk wordt het duidelijk als je de code ziet en er mee kan spelen.

Pas om te beginnen weer de `animate` functie aan:

<pre><code>function animate() {
  requestAnimationFrame(animate);
  <b>TWEEN.update();</b>
  walk();
  turn();
  acrobatics();
  renderer.render(scene, camera);
}
animate();</code></pre>

De regel `TWEEN.update();` zorgt ervoor dat elke "TWEEN" die je in jouw programma hebt gemaakt een beetje wordt bijgewerkt. Afhankelijk van hoe lang de animatie moet duren berekent `TWEEN.js` hoeveel de waarde moet worden veranderd.

Pas nu ook de `turn` functie aan:

<pre><code>function turn() {
  var direction = 0;
  if (is_moving_forward) direction = Math.PI;
  if (is_moving_back) direction = 0;
  if (is_moving_right) direction = Math.PI/2;
  if (is_moving_left) direction = -Math.PI/2;

  <b>spinAvatar(direction);</b>
}</code></pre>

In plaats van de rotatie van de avatar direct aan te passen roep je een nieuwe functie, `spinAvatar` aan. In die functie gaan we de draai animeren met `TWEEN.js`.

Voeg de `spinAvatar` functie toe, direct onder de `turn` functie:

```
function spinAvatar(direction) {
  new TWEEN
    .Tween({ y: avatar.rotation.y })
    .to({ y: direction }, 100)
    .onUpdate(function () {
      avatar.rotation.y = this.y;
    })
    .start();
}
```

Met de regel `.Tween({ y: avatar.rotation.y })` stel je de beginwaarde in van de animatie. In dit geval sla je de huidige waarde van de y-rotatie van de avatar op in een variable `y`.

Vervolgens stel je met `.to({ y: direction }, 100)` de eindwaarde in. `direction` is de parameter die je in de `turn` functie hebt berekend. De waarde **100** geeft aan hoe lang de animatie moet duren, in dit geval 100 milliseconden of 0.1 seconde.

De `onUpdate` functie wordt uitgevoerd elke keer als `TWEEN.update();` in de `animate` functie wordt aangeroepen, totdat de eindtijd (en eindwaarde) is bereikt. Afhankelijk van de verstreken tijd sinds de animatie is gestart krijgt de avatar een y-rotatie tussen de beginwaarde en eindwaarde in.

> **Probeer het zelf:** Hopelijk kon je de uitleg van `TWEEN.js` een beetje volgen. Het is erg moeilijk om in zo simpel mogelijke tekst uit te leggen wat een animatie library kan doen. Experimenteer daarom zo veel mogelijk. Probeer bijvoorbeeld eens om `rotation` door `position` te vervangen. Of om als eindwaarde **0** op te geven i.p.v. `direction`. En speel uiteraard met de tijdsduur van de animatie.

[Volgende opdracht](opdracht6.md) - [Vorige opdracht](opdracht4.md) - [Uitleg](README.md)
