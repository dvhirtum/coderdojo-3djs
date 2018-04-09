# Opdracht 6 - Botsingen

* boundaries maken waar de avater niet in mag koment
```
var not_allowed = [];
```
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

* collision detectie maken die voorkomt dat de avatar in de boundary komt
```
function detectCollisions() {
  var vector = new THREE.Vector3(0, -1, 0);
  var ray = new THREE.Raycaster(marker.position, vector);
  var intersects = ray.intersectObjects(not_allowed);
  if (intersects.length > 0) return true;
  return false;
}
```

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
    if (is_moving_left) marker.position.x = marker.position.x + 5;
    if (is_moving_right) marker.position.x = marker.position.x - 5;
    if (is_moving_forward) marker.position.z = marker.position.z + 5;
    if (is_moving_back) marker.position.z = marker.position.z - 5;
  }</b>
});</code></pre>
