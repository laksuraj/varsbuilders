import {loadGLTF, loadVideo} from "./libs/loader.js";
import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const splashScreen = document.querySelector('.splash-screen');
    const registerButton = document.querySelector('.register-button');
    const registerPage = document.querySelector('.register-page');
    const submitButton = document.querySelector('#submit');

    // Hide splash screen after 3 seconds
    setTimeout(() => {
      splashScreen.style.display = 'none';
      registerButton.style.display = 'block';
    }, 920);

    // Handle Register button click
    registerButton.addEventListener('click', () => {
      registerButton.style.display = 'none';
      registerPage.style.display = 'flex';
    });

    // Handle form submission
    submitButton.addEventListener('click', () => {
      const name = document.querySelector('#name').value;
      const phone = document.querySelector('#phone').value;
      const email = document.querySelector('#email').value;

      console.log('Registration Details:', { name, phone, email });
      alert('Registration successful!');
      registerPage.style.display = 'none';
    });

    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind',
    });

    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("./assets/videos/EvoHomes.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    };
    anchor.onTargetLost = () => {
      video.pause();
    };
    video.addEventListener('play', () => {
      video.currentTime = 6;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});
