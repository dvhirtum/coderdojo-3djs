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

var is_cartwheeling = false;
var is_flipping = false;
function animate() {
  requestAnimationFrame(animate);
  if (is_cartwheeling) {
    avatar.rotation.z = avatar.rotation.z + 0.05;
  }
  if (is_flipping) {
    avatar.rotation.x = avatar.rotation.x + 0.05;
  }
  renderer.render(scene, camera);
}
animate();

document.addEventListener('keydown', function (event) {
  var code = event.keyCode;
  var speed = 15;

  if (code == 37) marker.position.x = marker.position.x - speed; // pijltje naar links
  if (code == 38) marker.position.z = marker.position.z - speed; // pijltje omhoog
  if (code == 39) marker.position.x = marker.position.x + speed; // pijltje naar rechts
  if (code == 40) marker.position.z = marker.position.z + speed; // pijltje omlaag
  if (code == 67) is_cartwheeling = !is_cartwheeling; // C
  if (code == 70) is_flipping = !is_flipping; // F
});
