# Opdracht 7 - Fruit Hunt

* scorebord toevoegen
```
var scoreboard = new Scoreboard();
scoreboard.countdown(45);
scoreboard.score();
```
```
scoreboard.help(
  'Gebruik de pijltjes om te bewegen; ' +
  'Spring met spatiebalk om het fruit te vangen; ' +
  'Zoek naar schuddende bomen met fruit.' +
  'Ga naar de boom en spring voordat het fruit verdwijnt!'
);
```
```
scoreboard.onTimeExpired(function () {
  scoreboard.message("Game Over!");
});
```

* bomen schudden

vervang de 4 `makeTreeAt(...);` regels door:
<pre><code><b>var tree_with_treasure;
var trees = [];
trees.push(makeTreeAt( 500, 0));
trees.push(makeTreeAt(-500, 0));
trees.push(makeTreeAt( 750, -1000));
trees.push(makeTreeAt(-750, -1000));
</b></code></pre>

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

* springen voor fruit
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

```
function jump() {
  checkForTreasure();
  animateJump();
}
```

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

```
function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
}
```

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

* geluid toevoegen

<pre><code>function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
  <b>Sounds.bubble.play();</b>
}</code></pre>

* fruit animeren
<pre><code>function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
  Sounds.bubble.play();
  <b>animateFruit();</b>
}</code></pre>

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
