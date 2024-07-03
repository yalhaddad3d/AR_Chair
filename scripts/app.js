document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    function createScene() {
        var scene = new BABYLON.Scene(engine);
        var xr = scene.createDefaultXRExperienceAsync();

        BABYLON.SceneLoader.ImportMesh('', 'assets/chair.glb', '', scene, function (meshes) {
            var chair = meshes[0];
            chair.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1); // Example scaling

            xr.input.onControllerAddedObservable.add(function (controller) {
                // Example: chair.position = controller.pointer.absolutePosition;
            });
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
