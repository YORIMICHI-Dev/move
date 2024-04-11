import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  HemisphericLight,
} from '@babylonjs/core';
import type { Nullable } from '@babylonjs/core';

type SceneConfigType = {
  engine: Engine | null;
  scene: Scene | null;
  createScene: (
    canvas: Nullable<HTMLCanvasElement | OffscreenCanvas | WebGLRenderingContext | WebGL2RenderingContext>
  ) => void;
  setPosition: (name: string, x: number, y: number, z: number) => void;
};

export const myScene: SceneConfigType = {
  engine: null,
  scene: null,
  createScene: function (canvas) {
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    this.engine = engine;
    this.scene = scene;

    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    new HemisphericLight('light', Vector3.Up(), scene);

    const boxRed = MeshBuilder.CreateBox('box-red', { size: 1 }, scene);
    const materialRed = new StandardMaterial('box-red-material', scene);
    materialRed.diffuseColor = Color3.Red();
    boxRed.material = materialRed;
    boxRed.position.x = -2;

    const boxBlue = MeshBuilder.CreateBox('box-yellow', { size: 1 }, scene);
    const materialYellow = new StandardMaterial('box-blue-material', scene);
    materialYellow.diffuseColor = Color3.Yellow();
    boxBlue.material = materialYellow;

    const boxGreen = MeshBuilder.CreateBox('box-green', { size: 1 }, scene);
    const materialGreen = new StandardMaterial('box-green-material', scene);
    materialGreen.diffuseColor = Color3.Green();
    boxGreen.material = materialGreen;
    boxGreen.position.x = 2;

    engine.runRenderLoop(() => {
      scene.render();

      boxGreen.rotation.y += 0.01;
    });
  },
  setPosition: function (name, x, y, z) {
    if (this.scene === null) return;

    const mesh = this.scene.getMeshByName(name);
    if (mesh) {
      mesh.position = new Vector3(x, y, z);
    }
  },
};
