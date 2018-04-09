# Opdracht 2 - Een avatar maken

* Hoofd, lijf, armen en benen toevoegen

lijf:
```
var cover = new THREE.MeshNormalMaterial();
var body = new THREE.SphereGeometry(100);
var avatar = new THREE.Mesh(body, cover);
scene.add(avatar);
```

armen:
```
var hand = new THREE.SphereGeometry(50);

var right_hand = new THREE.Mesh(hand, cover);
right_hand.position.set(-150, 0, 0);
scene.add(right_hand);
```
```
var left_hand = new THREE.Mesh(hand, cover);
left_hand.position.set(150, 0, 0);
scene.add(left_hand);
```

benen: zelf uitzoeken
```
var foot = new THREE.SphereGeometry(50);

var right_foot = new THREE.Mesh(foot, cover);
right_foot.position.set(-75, -125, 0);
scene.add(right_foot);

var left_foot = new THREE.Mesh(foot, cover);
left_foot.position.set(75, -125, 0);
scene.add(left_foot);
```

* Naar eigen smaak aanpassen

bijvoorbeeld extra bol voor hoofd. Andere vorm voor lijf

* Animatie

```
function animate() {
  requestAnimationFrame(animate);
  avatar.rotation.z = avatar.rotation.z + 0.05;
  renderer.render(scene, camera);
}
animate();
```

* Hierarchy van objecten laten zien

armen en benen aan avatar koppelen i.p.v. scene
<pre><code><b>avatar</b>.add(right_hand);</code></pre>

* Animatie uitzetten

<pre><code><b>var is_cartwheeling = false;</b>
function animate() {
  requestAnimationFrame(animate);
  <b>if (is_cartwheeling) {</b>
    avatar.rotation.z = avatar.rotation.z + 0.05;
  <b>}</b>
  renderer.render(scene, camera);
}
animate();</code></pre>

verander is_cartwheeling van false naar true: animatie aan
