document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    function createScene() {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 3, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        BABYLON.SceneLoader.ImportMesh('', 'assets/chair.glb', '', scene, function (meshes) {
            var chair = meshes[0];
            chair.position.y = 0; // Example positioning
        }, null, function (scene, message, exception) {
            console.error('Unable to load model:', message, exception);
        });

        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });
});
