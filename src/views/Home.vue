<template>
    <mu-paper class="bg" :rounded="false" :zDepth="3">
        <header>
            <div class="logo">
                <span>FCoder</span>
            </div>
            <div class="nav">
                <div class="nav-item">
                    <a href="https://github.com/ToBegin" target="_blank">
                        <img width="30" title="github" :src="github" alt="">
                    </a>
                </div>
            </div>
        </header>
        <div class="content">
            <p v-for="link in links" :key="link.src">
                <a :href="link.src">{{ link.name }}</a>
            </p>
        </div>
    </mu-paper>
</template>

<script>
import github from '@/assets/github.svg'
export default {
    name: 'Home',
    data () {
        return {
            github,
            activeTab: '',
            links: [
                {
                    name: 'Audio Visualizer',
                    src: '/audioVisualizer'
                },
                {
                    name: 'NES Game',
                    src: '/nes'
                },
                {
                    name: 'Color Analysis',
                    src: '/color'
                }
                // {
                //     name: 'WebGL',
                //     src: '/three'
                // }
            ]
        }
    },
    methods: {
        handleTabChange(val) {
            this.activeTab = val;
        }
    }
}
</script>

<style lang="stylus">
@import '~assets/css/variables'
@import '~assets/css/mixins'
.bg {
    height 100vh
    position relative
    color #fff
    text-align center
    linear()
    header {
        display flex
        height 60px
        padding 0 20px
        background transparent
        .logo {
            display flex
            flex 1
            justify-content left
            align-items center
            span {
                font-size 24px
                color #fff
            }
        }
        .nav {
            display flex
            flex 1
            align-items center
            justify-content flex-end
            .nav-item {
                cursor pointer
            }
        }
    }
    .content {
        position absolute
        left 50%
        top 15%
        width 600px
        margin-left -(@width / 2)
        font-size 40px
        a {
            color #fff
            text-shadow: 1px 1px 0px #c5c5c5
            transition all .5s
            &:hover {
                color secondary
                text-shadow: 1px 1px 0px secondary
            }
        }
    }
}
</style>