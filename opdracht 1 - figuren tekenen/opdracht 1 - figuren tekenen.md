# Opdracht 1 - Figuren tekenen

* sphere tekenen
```
var shape = new THREE.SphereGeometry(100);
var cover = new THREE.MeshNormalMaterial();
var ball = new THREE.Mesh(shape, cover);
scene.add(ball);
```

* smoothness aanpassen

<pre><code>var shape = new THREE.SphereGeometry(100<b>, 20, 15</b>);</code></pre>

* position aanpassen
```
ball.position.set(-250,250,-250);
```

* kubus tekenen
```
var shape = new THREE.CubeGeometry(100, 100, 100);
var cover = new THREE.MeshNormalMaterial();
var box = new THREE.Mesh(shape, cover);
scene.add(box);
```

* roteren
```
box.rotation.set(0.5, 0.5, 0);
```

* formaat aanpassen
<pre><code>var shape = new THREE.CubeGeometry(<b>300, 100, 20</b>);</code></pre>

* position aanpassen
```
box.position.set(250, 250, -250);
```

* cilinder tekenen
```
var shape = new THREE.CylinderGeometry(20, 20, 100);
var cover = new THREE.MeshNormalMaterial();
var tube = new THREE.Mesh(shape, cover);
scene.add(tube);
```

* kan je 'm zelf roteren?
```
tube.rotation.set(0.5, 0, 0);
```

* spelen met formaat

disc: <pre><code>var shape = new THREE.CylinderGeometry(<b>100, 100, 20</b>);</code></pre>
cone: <pre><code>var shape = new THREE.CylinderGeometry(<b>1, 100, 100</b>);</code></pre>

* hoe maak je een piramide?

pyramid: <pre><code>var shape = new THREE.CylinderGeometry(<b>1, 100, 100, 4</b>);</code></pre>

* position aanpassen
```
tube.position.set(250, -250, -250);
```

* plat oppervlak tekenen
```
var shape = new THREE.PlaneGeometry(100, 100);
var cover = new THREE.MeshNormalMaterial();
var ground = new THREE.Mesh(shape, cover);
scene.add(ground);
ground.rotation.set(0.5, 0, 0);
```

* spelen met formaat
<pre><code>var shape = new THREE.PlaneGeometry(<b>300</b>, 100);</code></pre>

* position aanpassen
```
ground.position.set(-250, -250, -250);
```

* torus tekenen
```
var shape = new THREE.TorusGeometry(100, 25);
var cover = new THREE.MeshNormalMaterial();
var donut = new THREE.Mesh(shape, cover);
scene.add(donut);
```

* spelen met smoothness en arc-length
<pre><code>var shape = new THREE.TorusGeometry(100, 25<b>, 8, 25</b>);</code></pre>

<pre><code>var shape = new THREE.TorusGeometry(100, 25, 8, 25<b>, 3.14</b>);</code></pre>

* animatie toevoegen
```
var clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  var t = clock.getElapsedTime();

  ball.rotation.set(t, 2*t, 0);
  box.rotation.set(t, 2*t, 0);
  tube.rotation.set(t, 2*t, 0);
  ground.rotation.set(t, 2*t, 0);
  donut.rotation.set(t, 2*t, 0);

  renderer.render(scene, camera);
}

animate();
```
