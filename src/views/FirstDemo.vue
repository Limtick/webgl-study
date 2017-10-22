<template>
  <div class="active-view" ref="activeView">
    
  </div>
</template>

<script>

export default {
  name: 'FirstDemo',
  data () {
    return {
      view: {
        width: '',
        height: '',
        controls: null,
        keyboard: new THREEx.KeyboardState(),
        stats: null,
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
      let VIEW_ANGLE = 45, ASPECT = view.width / view.height, NEAR = 0.1, FAR = 20000
      view.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
      view.scene.add(view.camera)
      // set(x, y, Z) default (0, 0, 0)
      view.camera.position.set(0, 150, 400);
      view.camera.lookAt(view.scene.position);
      // 判断浏览器是否支持
      if (Detector.webgl)
        view.renderer = new THREE.WebGLRenderer({ antialias: true })
      else
        view.renderer = new THREE.CanvasRenderer()
      // 渲染添加
      view.renderer.setSize(view.width, view.height)
      this.$refs.activeView.appendChild(view.renderer.domElement)

      THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });
      this.controls = new THREE.OrbitControls(view.camera, view.renderer.domElement)
      THREEx.WindowResize(view.renderer, view.camera)

      // 状态视窗
      view.stats = new Stats()
      view.stats.domElement.style.position = 'absolute'
      view.stats.domElement.style.bottom = '0px'
      view.stats.domElement.style.zIndex = 100
      this.$refs.activeView.appendChild(view.stats.domElement)

      // create a light
      var light = new THREE.PointLight(0xffffff)
      light.position.set(0, 250, 0)
      view.scene.add(light)
      var ambientLight = new THREE.AmbientLight(0x111111)
	    // view.scene.add(ambientLight);


      // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
      var floorTexture = new THREE.TextureLoader().load('/static/image/checkerboard.jpg')
      floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
      floorTexture.repeat.set(10, 10)
      // DoubleSide: render texture on both sides of mesh
      var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
      var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1)
      var floor = new THREE.Mesh(floorGeometry, floorMaterial)
      floor.position.y = -0.5
      floor.rotation.x = Math.PI / 2
      view.scene.add(floor)

      // make sure the camera's "far" value is large enough so that it will render the skyBox!
      var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000)
      // BackSide: render faces from inside of the cube, instead of from outside (default).
      var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide })
      var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial)
      // view.scene.add(skyBox);

      // fog must be added to scene before first render
      view.scene.fog = new THREE.FogExp2(0x9999ff, 0.00025)


      // most objects displayed are a "mesh":
      //  a collection of points ("geometry") and
      //  a set of surface parameters ("material")	

      // Sphere parameters: radius, segments along width, segments along height
      var sphereGeometry = new THREE.SphereGeometry(50, 32, 16)
      // use a "lambert" material rather than "basic" for realistic lighting.
      //   (don't forget to add (at least one) light!)
      var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x8888ff })
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(100, 50, -50)
      view.scene.add(sphere)
      var cube
      // Create an array of materials to be used in a cube, one for each side
      var cubeMaterialArray = []
      // order to add materials: x+,x-,y+,y-,z+,z-
      cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff3333 }))
      cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff8800 }))
      cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xffff33 }))
      cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x33ff33 }))
      cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x3333ff }))
      cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x8833ff }))
      // Cube parameters: width (x), height (y), depth (z), 
      //        (optional) segments along x, segments along y, segments along z
      var cubeGeometry = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1)
      // using THREE.MeshFaceMaterial() in the constructor below
      //   causes the mesh to use the materials stored in the geometry
      cube = new THREE.Mesh(cubeGeometry, cubeMaterialArray)
      cube.position.set(-100, 50, -50)
      view.scene.add(cube)

      // create a set of coordinate axes to help orient user
      //    specify length in pixels in each direction
      var axes = new THREE.AxisHelper(100)
      view.scene.add(axes)


      var clock = new THREE.Clock()

      /* let geometry = new THREE.BoxGeometry(1, 1, 1)
      let material = new THREE.MeshBasicMaterial({ color: '#f66' })
      let cube = new THREE.Mesh(geometry, material)
      view.scene.add(cube) */

      let animate = function() {
        requestAnimationFrame(animate)
        var delta = clock.getDelta();
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.01
        view.stats.update()
        _this.controls.update();
        view.renderer.render(view.scene, view.camera)
      };

      animate();
    }
  },
  mounted () {
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


