document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    function createScene() {
        var scene = new BABYLON.Scene(engine);
        
        // Create a WebXR experience
        var xr = scene.createDefaultXRExperienceAsync({
            floorMeshes: [], // Disable Babylon's default floor
            disableTeleportation: true // Disable teleportation (optional)
        }).then(function (xr) {
            // Callback function when XR session is started
            xr.enterXRAsync('immersive-ar', 'local-floor').then(function () {
                // Create an XR background layer
                var xrBackground = xr.baseExperience.featuresManager.enableFeature(
                    BABYLON.WebXRBackgroundRemover.Name,
                    'xrb',
                    {
                        depthValues: [0.3, 0.8], // Depth range for background removal
                        boxBlurRadius: 5, // Blur radius for smoother edges
                        samples: 4 // Number of samples for edge detection
                    }
                );

                // Load the chair model
                BABYLON.SceneLoader.ImportMesh('', 'assets/chair.glb', '', scene, function (meshes) {
                    var chair = meshes[0];
                    chair.position.y = 0; // Adjust position as needed
                }, null, function (scene, message, exception) {
                    console.error('Unable to load model:', message, exception);
                });
            });
        });

        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });
});
