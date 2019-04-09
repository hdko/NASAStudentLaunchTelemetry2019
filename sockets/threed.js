var scene, camera, renderer, rocket;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init() {
  scene = new THREE.Scene();
  var objLoader = new THREE.OBJLoader();
  var mtlLoader = new THREE.MTLLoader();

  mtlLoader.setPath('./');
  mtlLoader.load('object.mtl', function(materials) {

    materials.preload();

    objLoader.setPath('./');
    objLoader.setMaterials(materials);
    objLoader.load('object.obj', function(object) {

      rocket = object;
      scene.add(object);

    });
  });

  initLight();
  initCamera();
  initRenderer();

  document.body.appendChild(renderer.domElement);
}

function initLight() {
  var keyLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 1);
  keyLight.position.set(-100, 0, 100);

  scene.add(keyLight);
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 200);
  camera.position.set(0, 0, 20);
}

function initRenderer() {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('webgl2');
  renderer = new THREE.WebGLRenderer({ canvas:canvas, context: context});
  renderer.setSize(WIDTH, HEIGHT);
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function rotateRocket() {
  var q = new THREE.Quaternion();
  q.set(1, 1, 1, 1);
  q.normalize();
  rocket.quaternion.slerp(q, 1);
}

function animate() {
  requestAnimationFrame(animate);
  rotateRocket();
  render();
}

init();
animate();
