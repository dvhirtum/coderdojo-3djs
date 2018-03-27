var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********
var shape = new THREE.SphereGeometry(100);
var cover = new THREE.MeshNormalMaterial();
var ball = new THREE.Mesh(shape, cover);
scene.add(ball);
ball.position.set(-250, 250, -250);

var shape = new THREE.CubeGeometry(100, 100, 100);
var cover = new THREE.MeshNormalMaterial();
var box = new THREE.Mesh(shape, cover);
scene.add(box);
box.rotation.set(0.5, 0.5, 0);
box.position.set(250, 250, -250);

var shape = new THREE.CylinderGeometry(20, 20, 100);
var cover = new THREE.MeshNormalMaterial();
var tube = new THREE.Mesh(shape, cover);
scene.add(tube);
tube.rotation.set(0.5, 0, 0);
tube.position.set(250, -250, -250);

var shape = new THREE.PlaneGeometry(300, 100);
var cover = new THREE.MeshNormalMaterial();
var ground = new THREE.Mesh(shape, cover);
scene.add(ground);
ground.rotation.set(0.5, 0, 0);
ground.position.set(-250, -250, -250);

var shape = new THREE.TorusGeometry(100, 25, 8, 25);
var cover = new THREE.MeshNormalMaterial();
var donut = new THREE.Mesh(shape, cover);
scene.add(donut);

var clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  var t = clock.getElapsedTime();

  ball.rotation.set(t, 2 * t, 0);
  box.rotation.set(t, 2 * t, 0);
  tube.rotation.set(t, 2 * t, 0);
  ground.rotation.set(t, 2 * t, 0);
  donut.rotation.set(t, 2 * t, 0);

  renderer.render(scene, camera);
}
animate();
