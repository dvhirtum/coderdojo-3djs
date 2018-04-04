# 3D Javascript - CoderDojo Leiden

## Uitleg

In de bijgeleverde opdrachten leer je hoe je met Javascript een 3D spel kan maken. 

De complete challenge bestaat uit 7 opdrachten. Het is de bedoeling dat je de opdrachten op volgorde maakt, want iedere opdracht gaat verder waar de vorige is gebleven.

Omdat deze challenge gebruik maakt van een aantal **libraries** (voorgeprogrammeerde hulpmiddelen die het makkelijker maken om complexe taken te programmeren) is het belangrijk dat je niets weggooit wat in de opdracht-folder staat.
De enige file die je in elke opdracht hoeft aan te passen is `index.js` en alleen onder de volgende regel: 

<pre><code><i>// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********</i></code></pre>

> Let op: Je kunt `index.js` niet openen door er op te dubbelklikken, want dan probeert Windows het uit te voeren. Open het bestand daarom in je favoriete tekstverwerker (bij voorkeur niet notepad).

### Resultaat bekijken

Om de wijzigingen die je aan jouw code hebt gemaakt te bekijken kun je het `index.html` bestand in een browser openen. De makkelijkste manier is door op het bestand te dubbelklikken vanuit de verkenner van Windows.

### Code toevoegen

Als er in de opdracht staat dat je code moet **toevoegen**, dan wordt er altijd bij vermeldt waar je de code moet toevoegen. Let hier goed op, want als je de code op de verkeerde plaats toevoegd, dan zal het programma waarschijnlijk niet werken. In de opdracht kan bijvoorbeeld staan (maak je niet druk om wat de code doet, dat wordt in de opdrachten uitgelegd): 

*"Voeg de volgende code toe direct na de regel `scene.add(ball);`"*

<pre><code>ball.position.set(-250, 250, -250);</code></pre>

### Code veranderen
Als er in de opdracht staat dat je code moet **veranderen**, dan wordt er van je verwacht dat je alleen de **vetgedrukte** code aanpast. Bijvoorbeeld: in het onderstaande stuk code is alleen het cijfer **250** vetgedrukt. Dit betekent dat je alleen het cijfer dat op die plek stond moet vervangen door *250*, de rest van de code blijft dus gelijk.

<pre><code>var shape = new THREE.SphereGeometry(<b>250</b>);</code></pre>

### Uitwerkingen

Mocht je er niet uitkomen, dan staat er in elke opdracht-folder een folder met de naam **uitwerking**. Hierin vind je de opgeloste opdracht zodat je die kan vergelijken met je eigen resultaat.

### Online editor

Als je geen text editor op je computer hebt staan, dan kun je de challenge ook online maken. Ga naar daarvoor naar https://repl.it/@Dickvan/CoderDojo-3djs en klik op de ![fork](fork.png) knop. Dit maakt een copy van de startsituatie zodat je online kan werken zonder de startsituatie voor anderen kapot te maken.
