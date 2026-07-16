import * as THREE from 'three';

export class ARHelper {
  /**
   * Calculate position in 3D space based on 2D screen coordinates
   */
  static screenToWorld(
    screenX: number,
    screenY: number,
    screenWidth: number,
    screenHeight: number,
    camera: THREE.Camera,
    distance: number = 5
  ): THREE.Vector3 {
    const mouse = new THREE.Vector2();
    mouse.x = (screenX / screenWidth) * 2 - 1;
    mouse.y = -(screenY / screenHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const direction = raycaster.ray.direction;
    const position = new THREE.Vector3();
    position.copy(raycaster.ray.origin);
    position.addScaledVector(direction, distance);

    return position;
  }

  /**
   * Position character in corner of room
   */
  static positionInCorner(
    character: THREE.Object3D,
    cornerPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  ): void {
    const offset = 2; // Distance from edge

    switch (cornerPosition) {
      case 'top-left':
        character.position.set(-offset, offset, 0);
        break;
      case 'top-right':
        character.position.set(offset, offset, 0);
        break;
      case 'bottom-left':
        character.position.set(-offset, -offset, 0);
        break;
      case 'bottom-right':
        character.position.set(offset, -offset, 0);
        break;
    }
  }

  /**
   * Make character face towards a point
   */
  static lookAtPoint(
    character: THREE.Object3D,
    targetPoint: THREE.Vector3
  ): void {
    character.lookAt(targetPoint);
  }

  /**
   * Create floating animation
   */
  static createFloatingAnimation(
    object: THREE.Object3D,
    height: number = 0.2,
    speed: number = 500
  ): (time: number) => void {
    return (time: number) => {
      object.position.y += Math.sin(time / speed) * 0.01;
    };
  }
}
