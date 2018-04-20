# Opdracht 2 - Een avatar maken

[Volgende opdracht](opdracht3.md) - [Vorige opdracht](opdracht1.md) - [Uitleg](README.md)

In deze opdracht gaan we beginnen met het spel. Het eerste onderdeel van het spel is je eigen avatar.

Voordat je begint, gooi alle code onder de regel `// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********` weg. Dit is de enige keer dat je dit hoeft te doen. Opdracht 1 was bedoeld om je kennis te laten maken met de 3D objecten die je gaat gebruiken. Vanaf nu ga je beginnen met het maken van het spel.

## Het lijf van de avatar

Voeg de volgende code toe, onder de regel `// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********`:

```
var cover = new THREE.MeshNormalMaterial();
var body = new THREE.SphereGeometry(100);
var avatar = new THREE.Mesh(body, cover);
scene.add(avatar);

function animate() {
  requestAnimationFrame(anime);

  renderer.render(scene, camera);
}

animate();
```

Dit is allemaal bekende code als je opdracht 1 hebt gemaakt. Voor het lijf van de avatar gebruiken we gewoon een bol met een straal van **100**.

## Armen toevoegen

Voeg de volgende code toe, tussen de regels `scene.add(avatar);` en de `animate` functie:

```
var hand = new THREE.SphereGeometry(50);

var right_hand = new THREE.Mesh(hand, cover);
right_hand.position.set(-150, 0, 0);
scene.add(right_hand);

var left_hand = new THREE.Mesh(hand, cover);
left_hand.position.set(150, 0, 0);
scene.add(left_hand);
```

Weer gebeurt er weinig nieuws in deze code. Voor de armen gebruiken we twee kleinere bollen met een straal van **50**. Valt het je op dat je maar 1 keer de `SphereGeometry` maakt? Dat scheelt code schrijven! Ook het materiaal (`cover`) heb je niet opnieuw hoeven maken, dat hergebruik je gewoon van het materiaal dat je ook voor het lijf hebt gebruikt.

> **Probeer het zelf:** Voordat je verder spiekt kan je misschien zelf twee benen toevoegen? Je weet alles wat je moet weten hiervoor, het is alleen een kwestie van een vorm en formaat kiezen en de juiste positie bepalen.

## Benen toevoegen

Als je dat niet zelf al hebt gedaan, dan kun je twee benen toevoegen door de onderstaande code toe te voegen na de regel `scene.add(left_hand);`:

```
var foot = new THREE.SphereGeometry(50);

var right_foot = new THREE.Mesh(foot, cover);
right_foot.position.set(-75, -125, 0);
scene.add(right_foot);

var left_foot = new THREE.Mesh(foot, cover);
left_foot.position.set(75, -125, 0);
scene.add(left_foot);
```

> **Probeer het zelf:** Je avatar is nu af, maar je kan hem nog wel naar eigen smaak aanpassen. Misschien wil je een hoofd toevoegen? Of misschien wil je het lijf een andere vorm geven? Of de armen en benen? Wees creatief!

## De avatar animeren

Als afsluiting van deze opdracht ga je de avatar animeren: Je gaat hem salto's laten maken. 

Pas de `animate` functie als volgt aan:

<pre><code>function animate() {
  requestAnimationFrame(animate);
  <b>avatar.rotation.z = avatar.rotation.z + 0.05;</b>
  renderer.render(scene, camera);
}

animate();</code></pre>

Elke keer als de `animate` functie aangeroepen wordt veranderd de rotatie van de avatar in de z-richting met **0.05**. In opdracht 1 paste je elke keer de rotatie van een object aan door de waarden van alle richtingen in te stellen, maar het kan dus ook op deze manier voor elke richting (x, y en z) afzonderlijk.

Bekijk het resultaat in het andere venster. Wat valt je op?

## Hi&euml;rarchie van objecten

Alleen het lijf van je avatar beweegt! Dat komt omdat je elk onderdeel van je avatar aan de scene hebt toegevoegd en we alleen voor het lijf de rotatie aanpassen in de `animate` functie.

Je kan dit oplossen door voor alle andere onderdelen van je avatar (de armen, de benen en eventueel extra ledematen die je hebt toegevoegd) rotaties aan te passen, maar dat is wel erg veel werk. En als je in volgende opdrachten de avatar wilt kunnen besturen, dan is het niet handig als je dat telkens voor elke onderdeel opnieuw moet doen.

Gelukkig is er een betere manier. In plaats van de armen en benen (en hoofd, etc., als je die hebt) aan de scene toe te voegen kan je die ook aan het lijf toevoegen. Omdat het lijf zelf aan de scene is toegevoegd snapt `THREE.js` nog steeds hoe je de hele avatar moet tekenen, maar elke positie en rotatie verandering van het lijf heeft nu ook automatisch gevolgen voor de rest van de ledematen.

Om dit te doen verander je de volgende vier regels (Let op: ze staan niet zo onder elkaar als hieronder, dus je moet ze zelf even opzoeken):

```
scene.add(right_hand);
scene.add(left_hand);
scene.add(right_foot);
scene.add(left_foot);
```

door de volgende regels:

<pre><code><b>avatar</b>.add(right_hand);
<b>avatar</b>.add(left_hand);
<b>avatar</b>.add(right_foot);
<b>avatar</b>.add(left_foot);</code></pre>

Als je nu het resultaat bekijkt in het andere venster, dan maakt de hele avatar een salto!

## De animatie uitzetten

Leuk, zo'n animatie, maar in het spel wil je kunnen controleren wanneer de animatie afspeelt, en wanneer niet.

Pas daarom nog een keer de `animate` functie aan:

<pre><code><b>var is_cartwheeling = true;</b>
function animate() {
  requestAnimationFrame(animate);
  <b>if (is_cartwheeling) {</b>
    avatar.rotation.z = avatar.rotation.z + 0.05;
  <b>}</b>
  renderer.render(scene, camera);
}

animate();</code></pre>

Nu wordt de animatie alleen maar uitgevoerd als `is_cartwheeling` de waarde `true` heeft (Engels voor "waar"). Heb je genoeg van de animatie, verander dan `true` in `false` (Engels voor "niet waar") en de animatie stopt. In de volgende opdracht ga je dit verder uitbreiden door de animatie aan of uit te zetten met een toets op het toetsenbord, maar voor nu geeft het je een idee hoe je kan controleren of een stuk van je code wel of niet uitgevoerd wordt.

[Volgende opdracht](opdracht3.md) - [Vorige opdracht](opdracht1.md) - [Uitleg](README.md)
