var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********

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

makeTreeAt(500, 0);
makeTreeAt(-500, 0);
makeTreeAt(750, -1000);
makeTreeAt(-750, -1000);

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

  trunk.position.set(x, -75, z);

  scene.add(trunk);
}

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
  if (code == 37) { // pijltje naar links
    marker.position.x = marker.position.x - 5;
    is_moving_left = true;
  }
  if (code == 38) { // pijltje omhoog
    marker.position.z = marker.position.z - 5;
    is_moving_forward = true;
  }
  if (code == 39) { // pijltje naar rechts
    marker.position.x = marker.position.x + 5;
    is_moving_right = true;
  }
  if (code == 40) { // pijltje omlaag
    marker.position.z = marker.position.z + 5;
    is_moving_back = true;
  }
  if (code == 67) is_cartwheeling = !is_cartwheeling; // C
  if (code == 70) is_flipping = !is_flipping; // F
});

document.addEventListener('keyup', function (event) {
  var code = event.keyCode;
  if (code == 37) is_moving_left = false;
  if (code == 38) is_moving_forward = false;
  if (code == 39) is_moving_right = false;
  if (code == 40) is_moving_back = false;
});
