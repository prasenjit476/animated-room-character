import * as THREE from 'three';

class AnimatedCharacter {
  static create(): {
    character: THREE.Group;
    mixer: THREE.AnimationMixer | null;
    actions: THREE.AnimationAction[];
  } {
    const group = new THREE.Group();

    // Create a simple character using basic geometry
    const characterGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.3);
    const characterMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b6b,
      emissive: 0x8b0000,
    });
    const body = new THREE.Mesh(characterGeometry, characterMaterial);
    body.position.y = 0.2;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xffb366,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.5;
    head.castShadow = true;
    group.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.05, 0.55, 0.12);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.05, 0.55, 0.12);
    group.add(rightEye);

    // Smile (arc geometry)
    const smileGeometry = new THREE.TorusGeometry(0.05, 0.008, 16, 8, Math.PI);
    const smileMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, 0.45, 0.12);
    smile.rotation.x = Math.PI;
    group.add(smile);

    // Left Arm
    const armGeometry = new THREE.BoxGeometry(0.08, 0.35, 0.08);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffb366 });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.2, 0.25, 0);
    leftArm.castShadow = true;
    group.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.2, 0.25, 0);
    rightArm.castShadow = true;
    group.add(rightArm);

    // Left Leg
    const legGeometry = new THREE.BoxGeometry(0.08, 0.3, 0.08);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.1, -0.2, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.1, -0.2, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);

    // Create mixer for animations
    const mixer = new THREE.AnimationMixer(group);

    // Create simple wave animation
    const waveTrack = new THREE.VectorKeyframeTrack(
      'rightArm.rotation[z]',
      [0, 0.5, 1],
      [
        0,
        -Math.PI / 3,
        0,
      ]
    );

    const waveClip = new THREE.AnimationClip('wave', 1, [waveTrack]);
    const waveAction = mixer.clipAction(waveClip);
    waveAction.loop = THREE.LoopRepeat;

    return {
      character: group,
      mixer,
      actions: [waveAction],
    };
  }
}

export default AnimatedCharacter;
