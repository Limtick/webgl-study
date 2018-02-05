export default {
    data () {
        return {
            currentSetting: '',
            showAdvanced: false,

            // 设置数值
            lineSettings: {
                // 频率数
                frequencies: 60,

                // 间隔占rect宽度百分比
                rectSpacePercent: 0.1,

                // 能量块数量
                energyNum: 80,
                // 能量块上下间隔 最小值1
                energySpace: 3,

                lineWidth: 6,
                // 上下基线间距
                lineSpace: 3,

                color: '#00d0ff',

                // 线方向 
                // 1 → 双向 | 2 → 上 | 3 → 下
                direction: 1
            },

            // 方向
            lineDirectionDrop: [
                {
                    title: '双向',
                    value: 1
                },
                {
                    title: '向上',
                    value: 2
                },
                {
                    title: '向下',
                    value: 3
                }
            ],

            // 预设
            linePreinstallSetting: {
                default: {
                    name: '默认',
                    setting: {
                        // 频率数
                        frequencies: 80,

                        // 间隔占rect宽度百分比
                        rectSpacePercent: 0.1,

                        // 能量块数量
                        energyNum: 75,
                        // 能量块上下间隔 最小值1
                        energySpace: 2.5,

                        lineWidth: 6,
                        // 上下基线间距
                        lineSpace: 6,

                        color: '#00d0ff'
                    }
                },
                line: {
                    name: '预设1',
                    setting: {
                        // 频率数
                        frequencies: 80,

                        // 间隔占rect宽度百分比
                        rectSpacePercent: 0.1,

                        // 能量块数量
                        energyNum: 50,
                        // 能量块上下间隔 最小值1
                        energySpace: 5,

                        lineWidth: 2,
                        // 上下基线间距
                        lineSpace: 6,

                        color: '#00d0ff'
                    }
                }
            }
        }
    },
    computed: {
        lineParam () {
            let frequencies = this.lineSettings.frequencies;

            let averageWidth = Math.round(this.$refs.audioCanvas.width / frequencies);
            let rectSpacePercent = this.lineSettings.rectSpacePercent;

            // rect宽度 根据屏幕宽度自适应
            let rectWidth = Math.round(averageWidth * (1 - rectSpacePercent));
            // rect间距
            let rectSpace = Math.round(averageWidth * rectSpacePercent);

            let baseLine = Math.round(this.$refs.audioCanvas.height / 2);
            
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
    },
    watch: {
        currentSetting () {
            let { setting } = this.linePreinstallSetting[this.currentSetting];
            if (!setting) return;
            for (let key in setting) {
                this.lineSettings[key] = setting[key];
            }
        }
    },
    methods: {
        handleDirectionChange(value) {
            this.lineSettings.direction = value;
        },
        toggleDefaultSetting(type) {
            this.currentSetting = type;
        },
        handleColorChange(color) {
            this.lineSettings.color = color;
        }
    },
    mounted () {
        this.currentSetting = 'default';
    }
}