# Opdracht 5 - de avatar draaien.md

* avatar draaien
<pre><code>function animate() {
  requestAnimationFrame(animate);
  walk();
  <b>turn();</b>
  acrobatics();
  renderer.render(scene, camera);
}
animate();</code></pre>

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

* draai animeren
<pre><code>function animate() {
  requestAnimationFrame(animate);
  <b>TWEEN.update();</b>
  walk();
  turn();
  acrobatics();
  renderer.render(scene, camera);
}
animate();</code></pre>

<pre><code>function turn() {
  var direction = 0;
  if (is_moving_forward) direction = Math.PI;
  if (is_moving_back) direction = 0;
  if (is_moving_right) direction = Math.PI/2;
  if (is_moving_left) direction = -Math.PI/2;

  <b>spinAvatar(direction);</b>
}</code></pre>

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

* experimenteer met de draaisnelheid

<pre><code>function spinAvatar(direction) {
  new TWEEN
    .Tween({ y: avatar.rotation.y })
    .to({ y: direction }, <b>1000</b>)
    .onUpdate(function () {
      avatar.rotation.y = this.y;
    })
    .start();
}</code></pre>
