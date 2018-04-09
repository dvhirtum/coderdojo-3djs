# Opdracht 3 - De avatar besturen

* Beweging met pijltjes toetsen
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

* Laten zien wat er gebeurd als de hierarchy niet klopt
<pre><code><b>scene</b>.add(left_foot);</code></pre>

* animatie starten en stoppen
<pre><code>var is_cartwheeling = false;
<b>var is_flipping = false;</b>
function animate() {
  requestAnimationFrame(animate);
  if (is_cartwheeling) {
    avatar.rotation.z = avatar.rotation.z + 0.05;
  }
  <b>if (is_flipping) {</b>
    avatar.rotation.x = avatar.rotation.x + 0.05;
  <b>}</b>
  renderer.render(scene, camera);
}
animate();</code></pre>

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

* bomen tekenen
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

* camera en avatar samen bewegen
```
avatar.add(camera);
```

* probleem met animaties oplossen
```
var marker = new THREE.Object3D();
scene.add(marker);
```

<pre><code><b>marker</b>.add(avatar);</code></pre>

<pre><code><b>marker</b>.add(camera);</code></pre>

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
