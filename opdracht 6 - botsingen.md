# Opdracht 6 - Botsingen

[Volgende opdracht](opdracht%207%20-%20fruit%20hunt.md) | [Vorige opdracht](opdracht%205%20-%20de%20avatar%20draaien.md) | [Uitleg](README.md)

Misschien is het je opgevallen dat de avatar op dit moment dwars door de bomen kan lopen. Dat is uiteraard niet de bedoeling, dus daar ga je in deze opdracht een stokje voor steken!

## Boundaries maken

Om te voorkomen dat de avatar door de bomen loopt heb je een lijst nodig van objecten die je kan vergelijken met de positie van de avatar om te bepalen of de avatar contact maakt met een boom.

Voeg de volgende regel code toe, direct onder de regel `// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********`:

```
var not_allowed = [];
```

Hierin kan je de objecten waar de avatar niet doorheen mag lopen bewaren. De objecten die je hierin stopt ga je toevoegen in de `makeTreeAt` functie.

Pas de `makeTreeAt` functie als volgt aan:

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

  <b>var boundary = new THREE.Mesh(
    new THREE.CircleGeometry(300),
    new THREE.MeshNormalMaterial()
  );
  boundary.position.y = -100;
  boundary.rotation.x = -Math.PI/2;
  trunk.add(boundary);

  not_allowed.push(boundary);</b>

  trunk.position.set(x, -75, z);
  scene.add(trunk);
}</code></pre>

Elke boom krijgt er een object bij met de naam `boundary`. Dit is een cirkel die plat op de vloer onder de boom wordt getekend (daar zorgen de `position` en `rotation` regels voor).

Vervolgens wordt deze `boundary` aan de `not_allowed` lijst toegevoegd zodat je deze later kan vergelijken met de positie van de avatar.

Door een platte vorm op de vloer te projecteren (in dit geval een cirkel) heb je het bepalen van een botsing tussen de avatar en een boom versimpeld van een moeilijke berekening of twee 3-dimensionale objecten ergens in de ruimte contact maken, naar een simpele controle of een 2-dimensionaal punt (de plaats van de avatar op de vloer) zich binnen of buiten een cirkel (de `boundary` van de boom) bevind. 

Het ontwikkelen van spellen zit vol met dit soort slimme oplossingen om met zo min mogelijk rekenkracht zo veel mogelijk voor elkaar te krijgen.

## Collision detection

Nu je hebt vastgelegd waar de avatar niet mag komen, kun je gaan bepalen of hij daar wel of niet is. Dit heet `collision detection`, of "botsings-detectie" in het nederlands.

Voeg de volgende code toe, helemaal onderaan `index.js`:

```
function detectCollisions() {
  var vector = new THREE.Vector3(0, -1, 0);
  var ray = new THREE.Raycaster(marker.position, vector);
  var intersects = ray.intersectObjects(not_allowed);
  if (intersects.length > 0) return true;
  return false;
}
```

De eerste twee regels van deze `detectCollisions` functie maken een `ray` (of "straal" in het nederlands) die van de huidige positie van de avatar (`marker.position`) recht naar beneden wijst (dat is wat `Vector3(0, -1, 0)` betekent). 

Je kan het vergelijken met een zaklamp die je voor je borst houdt en waarmee je naar de grond schijnt. Als je met de zaklamp de schaduw van de boom verlicht, dan kun je maar beter stoppen met lopen, anders stoot je je hoofd! Dat is precies wat de code `ray.insersectObjects(not_allowed)` doet.

## Stoppen met lopen

Nu je kan bepalen wanneer de avatar tegen een boom aanloopt, moet je nog zorgen dat hij dan stopt met lopen. Daarvoor pas je de `keydown` `eventListener` als volgt aan:

<pre><code>document.addEventListener('keydown', function (event) {
  var code = event.keyCode;
  var speed = 15;

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

  <b>if (detectCollisions()) {
    if (is_moving_left) marker.position.x = marker.position.x + speed;
    if (is_moving_right) marker.position.x = marker.position.x - speed;
    if (is_moving_forward) marker.position.z = marker.position.z + speed;
    if (is_moving_back) marker.position.z = marker.position.z - speed;
  }</b>
});</code></pre>

Nadat je bepaald hebt wat de nieuwe positie van de avatar moet worden, roep je de `detectCollisions` functie aan. Als er een botsing dreigt, dan draai je simpelweg de verandering van de positie weer terug. Omdat je zowel de eerste positie-wijziging als het terugdraaien doet voordat de avatar op de nieuwe positie getekent wordt, is het net alsof de positie nooit veranderd is.

Dit is het einde van opdracht 6. In de volgende, en laatste, opdracht ga je de speler een reden geven om van boom naar boom te lopen en maak je het spel af met een scorebord en geluid!

[Volgende opdracht](opdracht%207%20-%20fruit%20hunt.md) | [Vorige opdracht](opdracht%205%20-%20de%20avatar%20draaien.md) | [Uitleg](README.md)
