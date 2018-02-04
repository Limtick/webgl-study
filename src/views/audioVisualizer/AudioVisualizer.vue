<template>
    <div class="audio-visualizer" ref="audioVisualizer">
        <h1 class="music-name" v-show="!topPopup">{{ musicName }}</h1>
        
        <div class="music-icon-tip" ref="musicTip" @mouseenter="musicTipShow = true" @mouseleave="musicTipShow = false">
            <mu-icon-button icon="library_music" @click="$refs.file.click()"/>
            <mu-tooltip label="选择音乐" :show="musicTipShow" :trigger="$refs.musicTip" verticalPosition="bottom" horizontalPosition="center"/>
        </div>

        <div class="settings-icon-tip" ref="settingsTip" @mouseenter="settingsTipShow = true" @mouseleave="settingsTipShow = false">
            <mu-icon-button icon="settings"/>
            <mu-tooltip label="设置" :show="settingsTipShow" :trigger="$refs.settingsTip" verticalPosition="bottom" horizontalPosition="center"/>
        </div>

        <canvas ref="audioCanvas" class="audio-canvas" :width="screenWidth" :height="screenHeight"></canvas>
        <canvas ref="bgCanvas" class="bg-canvas" :width="screenWidth" :height="screenHeight"></canvas>

        <input ref="file" type="file" hidden/>
        <!-- <audio ref="audio" src="/static/oldToday.mp3"></audio> -->

        <mu-popup position="top" :overlay="false" :popupClass="['popup-top', type]" :open="topPopup">
            {{ message }}
        </mu-popup>
    </div>
</template>

<script>
const AudioContext = window.AudioContext || window.webkitAudioContext;
import lineParam from './lineParam';
export default {
    name: 'AudioVisualizer',
    data () {
        return {
            audio: null,
            musicName: 'Audio - Visualizer',
            audioContext: new AudioContext(),
            source: null,
            analyser: null,
            gainNode: null,
            fftSize: 4096,

            audioCtx: null,
            bgCtx: null,
            screenWidth: 0,
            screenHeight: 0,
            bg: new Image(),
            animationId: null,

            topPopup: false,
            type: '',
            message: '',
            musicTipShow: false,
            settingsTipShow: false
        }
    },
    mixins: [lineParam],
    computed: {
        
    },
    watch: {
        
    },
    methods: {
        appInit() {
            this.audioCtx = this.$refs.audioCanvas.getContext('2d');
            this.bgCtx = this.$refs.bgCanvas.getContext('2d');

            this.resize();
            // 加载背景图
            this.bg.src = '/static/image/bg.jpg';
            this.bg.onload = () => {
                this.drawBg();
            }
        },
        // audio元素方式
        audioInit() {
            this.source = this.audioContext.createMediaElementSource(this.$refs.audio);
            this.connect();
            this.$refs.audio.play();
            this.draw();
        },
        // 上传文件方式
        fileInit(file) {
            this.$refs.file.value = '';
            let fileReader = new FileReader();
            let buffer = fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                let fileResult = e.target.result;
                // 解码
                this.audioContext.decodeAudioData(fileResult , (buffer) => {
                    this.musicName = file.name.split('.')[0];
                    this.resetApp();

                    this.source = this.audioContext.createBufferSource();
                    this.source.buffer = buffer;
                    this.source.loop = true;
                    this.connect();

                    this.$nextTick(() => {
                        this.source.start(0);
                        this.draw();
                    })

                    this.source.onended = () => {
                        console.log('end');
                    }
                }, (e) => {
                    console.log(e);
                    this.showMessage('error', '请上传音频格式的文件');
                })
            }
        },
        // 连接：source → analyser → destination
        connect() {
            this.analyser = this.audioContext.createAnalyser();
            this.gainNode = this.audioContext.createGain();
            
            this.source.connect(this.analyser);
            this.source.connect(this.gainNode);
            this.analyser.connect(this.audioContext.destination);
            this.gainNode.connect(this.audioContext.destination);

            this.analyser.fftSize = this.fftSize;
            this.gainNode.gain.value = 0.1;
        },
        drawBg(scale = 1) {
            this.$nextTick(() => {
                // let imgWidth = 
                // this.bgCtx.clearRect(0, 0, this.$refs.bgCanvas.width, this.$refs.bgCanvas.height);
                this.bgCtx.drawImage(this.bg, 0, 0, this.screenWidth, this.screenHeight);
            })
        },
        draw() {
            // console.log(this.audioContext.currentTime);

            // 清理画布
            this.audioCtx.clearRect(0, 0, this.$refs.audioCanvas.width, this.$refs.audioCanvas.height);

            this.audioCtx.strokeStyle = "#00d0ff";
            this.audioCtx.lineWidth = 2;
            
            let dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(dataArray);

            this.lineType(dataArray);

            this.animationId = window.requestAnimationFrame(this.draw);
        },
        lineType(dataArray) {
            let {
                frequencies,
                step,
                averageWidth,
                rectWidth,
                rectSpace,
                energyNum,
                energySpace,
                baseLine,
                lineSpace
            } = this.lineParam;

            for (let i = 0; i < frequencies; i++) {
                let beginX = averageWidth * i + rectSpace;
                let endX = averageWidth * (i + 1) - rectSpace;
                
                let energy = (dataArray[step * i] / 256.0) * energyNum;
                // 基线
                // 上半部分
                this._drawLine(beginX, endX, baseLine - lineSpace);
                // 下半部分
                this._drawLine(beginX, endX, baseLine + lineSpace);
                // 单频率
                for (let j = 0; j < energy; j++) {
                    let space = energySpace * j;
                    // 上半部分
                    this._drawLine(beginX, endX, baseLine - lineSpace, space, 1);
                    // 下半部分
                    this._drawLine(beginX, endX, baseLine + lineSpace, space, -1);
                }
            }
        },
        _drawLine(beginX, endX, y, space=0, direction=1) {
            space = direction == 1 ? space : -space;
            this.audioCtx.beginPath();
            this.audioCtx.moveTo(beginX, y - space);
            this.audioCtx.lineTo(endX, y - space);
            this.audioCtx.stroke();
        },
        resetApp() {
            this.audioContext.close();
            this.audioContext = new AudioContext();
            window.cancelAnimationFrame(this.animationId);
        },
        resize() {
            this.screenWidth = this.$refs.audioVisualizer.clientWidth;
            this.screenHeight = this.$refs.audioVisualizer.clientHeight;
        },
        // 本地上传音乐文件
        addFileChangeEvent() {
            this.$refs.file.onchange = (e) => {
                let file = this.$refs.file.files[0];
                this.fileInit(file);
            }
        },
        showMessage(type, message, time=3000) {
            this.type = type;
            this.message = message;
            this.topPopup = true;
            setTimeout(() => {
                this.topPopup = false;
            }, time)
        }
    },
    mounted () {
        this.appInit();

        this.addFileChangeEvent();
        // this.audioInit();

        // window.onresize = () => {
        //     this.resize();
        //     this.drawBg();
        // }
    },
    beforeDestroy() {
        this.audioContext.close();
    }
}
</script>

<style lang="stylus" scoped>
icon-tip()
    position fixed
    z-index 10
    color #fff
    cursor pointer
.audio-visualizer {
    width 100%
    height 100vh
    position relative
    .music-name {
        position absolute
        left 50%;
        top -16px
        transform translateX(-50%)
        color #fff
        z-index 10
    }
    .audio-canvas {
        position absolute
        z-index 0
    }
    .bg-canvas {
        position absolute
        z-index -1
    }
    .music-icon-tip {
        icon-tip()
        left 10px
    }
    .settings-icon-tip {
        icon-tip()
        right 10px
    }
}
</style>