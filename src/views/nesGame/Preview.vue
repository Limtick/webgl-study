<template>
    <div class="preview-wrapper">
        <h2>{{ dataOffset }}</h2>
        <div class="views">
            <div class="view">
                <canvas ref="preview" width="640" height="640"></canvas>
                <div class="btn-group">
                    <mu-raised-button v-for="offset in offsets" :key="offset" :label="offset" @click="setOffset(offset)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Preview',
    data () {
        return {
            preCtx: null,

            // 8 bit
            pixelSize: 8,
            // 8 像素
            blocklPixel: 8,
            // 16 byte
            blockSize: 16,
            // 像素大小
            pixelWidth: 10,

            nesData: [],
            nesDataLength: 0,
            colors: [
                '#fff',
                '#d74e00',
                '#f79f00',
                '#878800'
            ],

            blockDataIndex: 0,
            dataOffset: 32784,
            blockData: [],

            offsets: ['-1024', '-16', '+16', '+1024']
        }
    },
    methods: {
        getNes(game) {
            this.$get(`/static/rom/${game}.nes`, {
                responseType: 'arraybuffer'
            }).then((res) => {
                let arr = new Uint8Array(res);
                this.nesData = arr;
                this.nesDataLength = arr.length;
                this.drawGroup();
                this.drawCombination();
                console.log(this.nesData);
            }).catch((mes) => {

            })
        },
        drawGroup() {
            for (let i = 0; i < this.pixelSize; i++) {
                let y = i * this.pixelSize * this.pixelWidth;
                for (let j = 0; j < this.pixelSize; j++) {
                    let x = j * this.pixelSize * this.pixelWidth;
                    this.blockDataIndex = this.dataOffset + (i * this.pixelSize + j) * this.blockSize;
                    this.blockData = this.nesData.slice(this.blockDataIndex, this.blockDataIndex + this.pixelSize * this.blockSize);
                    this.drawBlock(this.preCtx, x, y);
                }
            }
        },
        drawBlock(context, x, y) {
            // 每一行
            for (let i = 0; i < this.blocklPixel; i++) {
                let p1 = this.blockData[i];
                let p2 = this.blockData[i + 8];

                let py = y + i * this.pixelWidth;

                // 单行 每个像素
                for (let j = 0; j < this.blocklPixel; j++) {
                    let c1 = (p1 >> (7 - j)) & 0b00000001;
                    let c2 = (p2 >> (7 - j)) & 0b00000001;
                    let color = (c2 << 1) + c1;
                    let px = x + j * this.pixelWidth;
                    context.fillStyle = this.colors[color];
                    context.fillRect(px, py, this.pixelWidth, this.pixelWidth);
                }
            }
        },
        setOffset(offset) {
            this.dataOffset += Number(offset);
            this.dataOffset = this.$_.clamp(this.dataOffset, 0, this.nesDataLength);
            this.drawGroup();
        }
    },
    mounted () {
        this.preCtx = this.$refs.preview.getContext('2d');
        this.getNes('mario-1');
    }
}
</script>

<style lang="stylus" scoped>
.preview-wrapper {
    padding 10px 0
    h2 {
        margin 0
        text-align center
    }
    .views {
        display flex
        justify-content space-around
        .view {
            flex 0
            canvas {
                margin-bottom 20px
            }
        }
    }
}
    

</style>