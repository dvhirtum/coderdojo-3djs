# Opdracht 1 - Figuren tekenen

[Volgende opdracht](opdracht2.md) - [Uitleg](README.md)

Voordat we beginnen met het maken van het spel gaan we eerst een kijkje nemen naar de verschillende vormen die je met `THREE.js` kunt maken.

## Een bol tekenen

De eerste vorm die je gaat maken is een bol. 

Voeg de volgende code toe, direct onder de regel `// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********`:

```
var shape = new THREE.SphereGeometry(100);
var cover = new THREE.MeshNormalMaterial();
var ball = new THREE.Mesh(shape, cover);
scene.add(ball);
```

De code die je hebt toegevoegd, doet het volgende: 

Als eerste heb je een `SphereGeometry` gemaakt, wat letterlijk "bol-vorm" betekend. Het getal tussen haakjes (100) geeft aan hoe groot de bol moet worden. `THREE.js` heeft nog meer vormen (of "geometries"), waarvan je de meest gebruikte in deze opdracht &eacute;&eacute;n voor &eacute;&eacute;n zult gaan bekijken.

Vervolgens heb je een `MeshNormalMaterial` gemaakt. Dit is wat de bol zijn kleur geeft. In een latere opdracht ga je zien hoe je zelf je kleur kan bepalen, maar voor nu is het belangrijk om te weten dat elk voorwerp dat je maakt een materiaal moet hebben.

De derde regel, `var ball = new THREE.Mesh(shape, cover);`, voegt de vorm en het materiaal dat je hebt gemaakt samen tot een voorwerp dat je in je spel kan gebruiken.

Alles wat bepaald hoe het voorwerp eruit ziet is nu bepaald, maar je hebt nog een extra regel nodig om te zorgen dat de bol ook op het scherm getekend wordt en dat is de regel `scene.add(ball);`.

Als je nu je code zou starten en het resultaat bekijkt in het andere venster, dan gebeurt er nog niks. Daarvoor hebben we nog wat extra code nodig. 

Voeg de volgende code toe onder de regel `scene.add(ball);`:

```
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
```

Deze code maakt een functie met de naam `animate`. Een functie is een blokje code dat je maar een keer hoeft te typen, maar dat je meerdere keren kunt hergebruiken. 

Het eerste dat er in de functie gebeurd is dat er een andere functie, `requestAnimationFrame`, wordt aangeroepen en deze functie krijgt onze eigen functie, `animate`, mee als parameter. Wat dit doet, is dat we aan de browser vragen om zo snel mogelijk (zodra de browser klaar is om het scherm te verversen) de `animate` functie nogmaals aan te roepen. En omdat we dat elke keer als `animate` uitgevoerd word doen ontstaat er een oneindige lus. Dit is wat we de "game-loop" noemen. Door binnen deze `animate`-functie de objecten die we op het scherm tekenen te vari&euml;ren kunnen we animaties maken.

De volgende regel, `renderer.render(scene, camera);`, is wat er voor zorgt dat je de bol die je hebt gemaakt ook op het scherm ziet. `renderer` en `camera` zijn `Three.js` objecten die bovenaan het bestand voor je zijn gemaakt. De `renderer` zet de objecten die je aan de scene toevoegd om in vormen op het scherm en `camera` bepaald van welke kant je naar de objecten kijkt.

De laatste regel, `animate();`, roept de `animate` functie voor de eerste keer aan om de game-loop te starten.

Nu kun je je resultaat bekijken in het andere venster. Zie je jouw bol?

## De bol mooier maken

Als het goed is gegaan zie je een bol op het scherm, maar echt mooi is die niet. Hij is nogal hoekig, vind je niet?

Pas de regel waar je de `SphereGeometry` hebt gemaakt als volgt aan:

<pre><code>var shape = new THREE.SphereGeometry(100<b>, 20, 15</b>);</code></pre>

Dat is een stuk mooier, nietwaar? De getallen **20** en **15** bepalen uit hoeveel segmenten de bol in de breedte en hoogte bestaan. Als je deze getallen weglaat, dan gebruikt `THREE.js` hiervoor in de plaats standaardwaarden, namelijk **8** en **6**.

> **Probeer het zelf:** In plaats van alleen de getallen over te nemen die in de opdrachten staan kun je een heleboel leren door zelf met de getallen te spelen. Dit werkt het beste als je &eacute;&eacute;n getal per keer aanpast en daarna in het andere venster bekijkt wat er verandert.

Waarom zou je niet altijd hogere waarden gebruiken, als dat er veel mooier uitziet? Het probleem is dat uit hoe meer segmenten een object bestaat, des te zwaarder is het voor een computer om hem te tekenen. Hoe veel segmenten je gebruikt is dus altijd een afweging tussen hoe mooi het er uit moet zien en hoe krachtig de computer is van de persoon die jouw spel gaat spelen.

## De bol verplaatsen

Om ruimte te maken voor de volgende vorm die je gaat tekenen, ga je eerst de bol aan de kant zetten.

Voeg de volgende regel toe, onder `scene.add(ball);`, maar boven de `animate` functie:

```
ball.position.set(-250, 250, -250);
```

Deze regel code verplaatst de bol naar links, naar boven en naar achteren.

## Een kubus tekenen

De volgende vorm die je gaat maken is een kubus.

Voeg de volgende code toe onder de regel die de positie van de bol aanpast:

```
var shape = new THREE.CubeGeometry(100, 100, 100);
var cover = new THREE.MeshNormalMaterial();
var box = new THREE.Mesh(shape, cover);
scene.add(box);
```

Deze code lijkt heel erg op de code om een bol te maken. Eigenlijk is alleen de eerste regel anders: In plaats van een `SphereGeometry` gebruik je een `CubeGeometry`. En de parameters zijn anders: De eerste **100** bepaalt de lengte, de tweede **100** de hoogte en de laatste **100** de diepte.

Bekijk je resultaat in het andere venster. Wat zie je?

## De kubus roteren

De kubus is zichtbaar, maar je ziet alleen maar een plat vlak. Hoe komt dat?

De kubus staat precies met &eacute;&eacute;n vlak naar de camera gericht. Om de vorm van de kubus beter te bekijken van je deze draaien.

Voeg de volgende regel code toe, onder `scene.add(box);`:

```
box.rotation.set(0.5, 0.5, 0);
```

> **Probeer het zelf:** Ik zou je een hoop wiskunde kunnen geven om uit te leggen hoe de getallen in de rotatie-regel hierboven precies werken. Maar daar hebben we allebei geen zin in, of wel? Probeer eens met de getallen te spelen om een idee te krijgen hoe de kubus draait (dit werkt het beste als niet alle zijden van de kubus dezelfde maat hebben).

## De kubus verplaatsen

Voeg de volgende regel code toe onder de regel die de rotatie instelt:

```
box.position.set(250, 250, -250);
```

## Een cilinder tekenen

Voeg de volgende regel code toe onder het verplaatsen van de kubus:

```
var shape = new THREE.CylinderGeometry(20, 20, 100);
var cover = new THREE.MeshNormalMaterial();
var tube = new THREE.Mesh(shape, cover);
scene.add(tube);
tube.rotation.set(0.5, 0, 0);
```

Weer veranderd er weinig ten opzichte van de bol en de kubus. Nu gebruiken we een `CylinderGeometry` met de parameters **20** (de straal van de bovenste cirkel), **20** (de straal van de onderste cirkel) en **100** (de hoogte). Je kan als vierde parameter ook nog aangeven uit hoe veel segmenten de cylinder moet bestaan (standaard is **8**).

> **Probeer het zelf:** Kan je met bovenstaande informatie bedenken hoe je `CylinderGeometry` kan gebruiken om een piramide te maken? (Kijk onderaan deze opdracht als je er niet uit komt)

## De cilinder verplaatsen

Voeg de volgende regel toe onder de regel `tube.rotation.set(0.5, 0, 0);`:

```
tube.position.set(250, -250, -250);
```

## Een plat oppervlak tekenen

Voeg de volgende code toe onder de regel `tube.position.set(250, -250, -250);`:

```
var shape = new THREE.PlaneGeometry(100, 100);
var cover = new THREE.MeshNormalMaterial();
var ground = new THREE.Mesh(shape, cover);
scene.add(ground);
ground.rotation.set(0.5, 0, 0);
```

Deze keer gebruik je `PlaneGeometry` om een plat vlak te maken. Je kan zelf uitproberen welke van de twee parameters de lengte en welke de breedte van het vlak voorstelt. Er is al wat rotatie ingesteld om het vlak duidelijk te zien. (wat zou je zien als je die rotatie weglaat?)

## Het vlak verplaatsen

Om plaats te maken voor de laatste vorm moet je ook het platte vlak verplaatsen. Voeg daarom de volgende regel code toe, onder `ground.rotation.set(0.5, 0, 0);`:

```
ground.position.set(-250, -250, -250);
```

## Een donut tekenen

De laatste vorm die je in deze opdracht gaat tekenen is een donut. Dit heet in `THREE.js` een `TorusGeometry`.

Voeg de volgende code toe na de regel `ground.position.set(-250, -250, -250);`:

```
var shape = new THREE.TorusGeometry(100, 25);
var cover = new THREE.MeshNormalMaterial();
var donut = new THREE.Mesh(shape, cover);
scene.add(donut);
```

De eerste parameter, **100**, geeft de straal van de donut aan en de tweede parameter, **25**, de dikte van de donut.

> **Probeer het zelf:** Je kan nog een derde en vierde parameter opgeven om weer het aantal segmenten waaruit de donut bestaat aan te passen. En je kan zelfs een vijfde parameter toevoegen om maar een deel van de donut te tekenen (tip: probeer eens het getal **3.14** voor die vijfde parameter)

## De vormen animeren

Het laatste dat je in deze (lange) eerste opdracht gaat doen is de vormen die je hebt gemaakt animeren.

Pas de `animate` functie als volgt aan:

<pre><code><b>var clock = new THREE.Clock();</b>

function animate() {
  requestAnimationFrame(animate);
  <b>var t = clock.getElapsedTime();

  ball.rotation.set(t, 2*t, 0);
  box.rotation.set(t, 2*t, 0);
  tube.rotation.set(t, 2*t, 0);
  ground.rotation.set(t, 2*t, 0);
  donut.rotation.set(t, 2*t, 0);</b>

  renderer.render(scene, camera);
}

animate();</code></pre>

Eerst maak je een `clock` object aan. Hiermee kan je aan `THREE.js` vragen hoeveel tijd er is verstreken (`clock.getElapsedTime()`). Door nu deze tijd-variable te gebruiken om de rotatie voor alle vormen aan te passen zullen ze constant om hun as draaien. Elke keer dat de `animate` functie wordt uitgevoerd zal de waarde van `t` namelijk net iets anders zijn waardoor ook de rotatie van alle vormen net iets anders zal zijn.

> **Uitwerking - een piramide tekenen:** Je kunt `CylinderGeometry` gebruiken om een piramide te tekenen: `var shape = new THREE.CylinderGeometry(1, 100, 100, 4);`

[Volgende opdracht](opdracht2.md) - [Uitleg](README.md)
