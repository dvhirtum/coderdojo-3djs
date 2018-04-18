# Opdracht 4 - De avatar animeren

* acrobatics uit animate functie halen
<pre><code>function animate() {
  requestAnimationFrame(animate);
  <b>acrobatics();</b>
  renderer.render(scene, camera);
}
animate();</code></pre>

```
var is_cartwheeling = false;
var is_flipping = false;
function acrobatics() {
  if (is_cartwheeling) {
    avatar.rotation.z = avatar.rotation.z + 0.05;
  }
  if (is_flipping) {
    avatar.rotation.x = avatar.rotation.x + 0.05;
  }
}
```
* animatie voor rechter hand toevoegen
```
var clock = new THREE.Clock(true);
```
```
function walk() {
  var position = Math.sin(clock.getElapsedTime() * 5) * 50;
  right_hand.position.z = position;
}
```
<pre><code>function animate() {
  requestAnimationFrame(animate);
  <b>walk();</b>
  acrobatics();
  renderer.render(scene, camera);
}
animate();</code></pre>

wat gebeurd er als je de 5 aanpast? en 50?
<pre><code>function walk() {
  var position = Math.sin(clock.getElapsedTime() * <b>10</b>) * 50;
  right_hand.position.z = position;
}</code></pre>
<pre><code>function walk() {
  var position = Math.sin(clock.getElapsedTime() * 5) * <b>100</b>;
  right_hand.position.z = position;
}</code></pre>

* animatie voor rest toevoegen

eerst zelf proberen

<pre><code>function walk() {
  var position = Math.sin(clock.getElapsedTime() * 5) * 50;
  right_hand.position.z = position;
  <b>left_hand.position.z = -position;
  right_foot.position.z = -position;
  left_foot.position.z = position;</b>
}</code></pre>

* loop animatie alleen uitvoeren tijdens lopen

<pre><code>function walk() {
  <b>if (!isWalking()) return;</b>
  var position = Math.sin(clock.getElapsedTime() * 5) * 50;
  right_hand.position.z = position;
  left_hand.position.z = -position;
  right_foot.position.z = -position;
  left_foot.position.z = position;
}</code></pre>

```
var is_moving_right, is_moving_left, is_moving_forward, is_moving_back;
function isWalking() {
  if (is_moving_right) return true;
  if (is_moving_left) return true;
  if (is_moving_forward) return true;
  if (is_moving_back) return true;
  return false;
}
```

<pre><code>document.addEventListener('keydown', function(event) {
  var code = event.keyCode;
  var speed = 15;

  if (code == 37) <b>{</b> // pijltje naar links
    marker.position.x = marker.position.x - speed;
    <b>is_moving_left = true;</b>
  <b>}</b>
  if (code == 38) <b>{</b> // pijltje omhoog
    marker.position.z = marker.position.z - speed;
    <b>is_moving_forward = true;</b>
  <b>}</b>
  if (code == 39) <b>{</b> // pijltje naar rechts
    marker.position.x = marker.position.x + speed;
    <b>is_moving_right = true;</b>
  <b>}</b>
  if (code == 40) <b>{</b> // pijltje omlaag
    marker.position.z = marker.position.z + speed;
    <b>is_moving_back = true;</b>
  <b>}</b>

  if (code == 67) is_cartwheeling = !is_cartwheeling; // C
  if (code == 70) is_flipping = !is_flipping; // F
});</code></pre>

```
document.addEventListener('keyup', function(event) {
  var code = event.keyCode;
  
  if (code == 37) is_moving_left = false;
  if (code == 38) is_moving_forward = false;
  if (code == 39) is_moving_right = false;
  if (code == 40) is_moving_back = false;
});
```
