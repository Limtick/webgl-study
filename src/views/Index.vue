<template>
  <div class="active-view" ref="activeView">
    
  </div>
</template>

<script>
import utils from '@/utils/utils'
export default {
  name: 'Index',
  data() {
    return {
      test: 'Hello Three',
      view: {
        width: '',
        height: '',
        scene: null,
        camera: null,
        renderer: null
      }
    }
  },
  methods: {
    init() {
      let _this = this
      let view = this.view
      view.width = this.$refs.activeView.clientWidth
      view.height = this.$refs.activeView.clientHeight
      // 屏幕
      view.scene = new THREE.Scene()
      // 摄影机
      let VIEW_ANGLE = 75, ASPECT = view.width / view.height, NEAR = 0.1, FAR = 1000;
      view.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
      if (Detector.webgl)
        view.renderer = new THREE.WebGLRenderer({ antialias: true });
      else
        view.renderer = new THREE.CanvasRenderer();
      view.renderer.setSize(view.width, view.height)
      this.$refs.activeView.appendChild(view.renderer.domElement)
      let geometry = new THREE.BoxGeometry(1, 1, 1)
      let material = new THREE.MeshBasicMaterial({ color: '#1976d2' })
      let cube = new THREE.Mesh(geometry, material)
      view.scene.add(cube)

      view.camera.position.z = 10;

      let animate = function() {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        view.renderer.render(view.scene, view.camera)
      };

      animate();

      THREEx.WindowResize(view.renderer, view.camera);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>

<style lang="less">
.active-view{
  height: 100%;
  canvas{
    width: 100%;
    height: 100%;
  }
}
</style>
