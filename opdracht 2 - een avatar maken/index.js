var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ******** SCHRIJF AL JE CODE NA DEZE REGEL ********
