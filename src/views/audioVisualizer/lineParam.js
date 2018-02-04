export default {
    data () {
        return {
            lineSettings: {
                // 频率数
                frequencies: 60,

                // 间隔占rect宽度百分比
                rectSpacePercent: 0.1,

                // 能量块数量
                energyNum: 80,
                // 能量块上下间隔 最小值1
                energySpace: 3,

                // 上下基线间距
                lineSpace: 3,
                
            }
        }
    },
    computed: {
        lineParam () {
            let frequencies = this.lineSettings.frequencies;

            let averageWidth = this.$refs.audioCanvas.width / frequencies;
            let rectSpacePercent = this.lineSettings.rectSpacePercent;

            // rect宽度 根据屏幕宽度自适应
            let rectWidth = averageWidth * (1 - rectSpacePercent);
            // rect间距
            let rectSpace = averageWidth * rectSpacePercent;

            let baseLine = Math.round(this.$refs.audioCanvas.height / 2);
            let lineSpace = this.lineSettings.lineSpace;
            
            return {
                ...this.lineSettings,
                // 频率采样步长
                step: Math.round((this.fftSize / 2) / frequencies),

                averageWidth,
                rectWidth,
                rectSpace,

                baseLine
            }
        }
    }
}