var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********

var not_allowed = [];

var scoreboard = new Scoreboard();
scoreboard.countdown(45);
scoreboard.score();
scoreboard.help(
  'Gebruik de pijltjes om te bewegen; ' +
  'Spring met spatiebalk om het fruit te vangen; ' +
  'Zoek naar schuddende bomen met fruit.' +
  'Ga naar de boom en spring voordat het fruit verdwijnt!'
);
scoreboard.onTimeExpired(function () {
  scoreboard.message("Game Over!");
});

var marker = new THREE.Object3D();
scene.add(marker);

var material = new THREE.MeshNormalMaterial();
var body = new THREE.SphereGeometry(100);
var avatar = new THREE.Mesh(body, material);
marker.add(avatar);

var hand = new THREE.SphereGeometry(50);
var right_hand = new THREE.Mesh(hand, material);
right_hand.position.set(-150, 0, 0);
avatar.add(right_hand);

var left_hand = new THREE.Mesh(hand, material);
left_hand.position.set(150, 0, 0);
avatar.add(left_hand);

var foot = new THREE.SphereGeometry(50);
var right_foot = new THREE.Mesh(foot, material);
right_foot.position.set(-75, -125, 0);
avatar.add(right_foot);

var left_foot = new THREE.Mesh(foot, material);
left_foot.position.set(75, -125, 0);
avatar.add(left_foot);

marker.add(camera);

var tree_with_treasure;
var trees = [];
trees.push(makeTreeAt(500, 0));
trees.push(makeTreeAt(-500, 0));
trees.push(makeTreeAt(750, -1000));
trees.push(makeTreeAt(-750, -1000));

function makeTreeAt(x, z) {
  var trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(50, 50, 200),
    new THREE.MeshBasicMaterial({ color: 0xA0522D })
  );
  var top = new THREE.Mesh(
    new THREE.SphereGeometry(150),
    new THREE.MeshBasicMaterial({ color: 0x228B22 })
  );
  top.position.y = 175;
  trunk.add(top);

  var boundary = new THREE.Mesh(
    new THREE.CircleGeometry(300),
    new THREE.MeshNormalMaterial()
  );
  boundary.position.y = -100;
  boundary.rotation.x = -Math.PI / 2;
  trunk.add(boundary);

  not_allowed.push(boundary);

  trunk.position.set(x, -75, z);

  scene.add(trunk);

  return top;
}

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

var clock = new THREE.Clock(true);
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  walk();
  turn();
  acrobatics();
  renderer.render(scene, camera);
}
animate();

function walk() {
  if (!isWalking()) return;
  var position = Math.sin(clock.getElapsedTime() * 5) * 50;
  right_hand.position.z = position;
  left_hand.position.z = -position;
  right_foot.position.z = -position;
  left_foot.position.z = position;
}

function turn() {
  var direction = 0;
  if (is_moving_forward) direction = Math.PI;
  if (is_moving_back) direction = 0;
  if (is_moving_right) direction = Math.PI / 2;
  if (is_moving_left) direction = -Math.PI / 2;
  spinAvatar(direction);
}

function spinAvatar(direction) {
  new TWEEN
    .Tween({ y: avatar.rotation.y })
    .to({ y: direction }, 100)
    .onUpdate(function () {
      avatar.rotation.y = this.y;
    })
    .start();
}

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

var is_moving_right, is_moving_left, is_moving_forward, is_moving_back;
function isWalking() {
  if (is_moving_right) return true;
  if (is_moving_left) return true;
  if (is_moving_forward) return true;
  if (is_moving_back) return true;
  return false;
}

document.addEventListener('keydown', function (event) {
  var code = event.keyCode;
  var speed = 15;

  if (code == 32) jump(); // spatiebalk

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
});

document.addEventListener('keyup', function (event) {
  var code = event.keyCode;
  if (code == 37) is_moving_left = false;
  if (code == 38) is_moving_forward = false;
  if (code == 39) is_moving_right = false;
  if (code == 40) is_moving_back = false;
});

function detectCollisions() {
  var vector = new THREE.Vector3(0, -1, 0);
  var ray = new THREE.Raycaster(marker.position, vector);
  var intersects = ray.intersectObjects(not_allowed);
  if (intersects.length > 0) {
    console.log("collision");
    return true;
  }
  return false;
}

function jump() {
  checkForTreasure();
  animateJump();
}

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

function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
  Sounds.bubble.play();
  animateFruit();
}

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

function animateJump() {
  new TWEEN
    .Tween({ jump: 0 })
    .to({ jump: Math.PI }, 500)
    .onUpdate(function () {
      marker.position.y = 200 * Math.sin(this.jump);
    })
    .start();
}
