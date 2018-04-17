var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********

var material = new THREE.MeshNormalMaterial();
var body = new THREE.SphereGeometry(100);
var avatar = new THREE.Mesh(body, material);
scene.add(avatar);

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

var is_cartwheeling = false;
function animate() {
  requestAnimationFrame(animate);
  if (is_cartwheeling) {
    avatar.rotation.z = avatar.rotation.z + 0.05;
  }
  renderer.render(scene, camera);
}
animate();
