<template>
  <mu-list>
    <mu-list-item title="Hello Three" to="/three/index" activeClass="actived">
      <mu-icon slot="left" value="send" />
    </mu-list-item>
    <mu-list-item title="First Demo" to="/three/first" activeClass="actived">
      <mu-icon slot="left" value="drafts" />
    </mu-list-item>
    <mu-list-item title="Inbox" toggleNested>
      <mu-icon slot="left" value="inbox" />
      <mu-list-item slot="nested" title="Starred">
        <mu-icon slot="left" value="grade" />
      </mu-list-item>
      <mu-list-item slot="nested" title="Sent mail" toggleNested>
        <mu-icon slot="left" value="send" />
        <mu-list-item title="Drafts" slot="nested">
          <mu-icon slot="left" value="drafts" />
        </mu-list-item>
      </mu-list-item>
      <mu-list-item slot="nested" title="Inbox" toggleNested>
        <mu-icon slot="left" value="inbox" />
        <mu-list-item title="Drafts" slot="nested">
          <mu-icon slot="left" value="drafts" />
        </mu-list-item>
      </mu-list-item>
    </mu-list-item>
  </mu-list>
</template>

<script>
import utils from '@/utils/utils'
export default {
  name: 'LeftSide',
  data() {
    return {
      menu: [
        {
          path: '/three/index',
          title: 'index',
          icon: 'inbox'
        }
      ]
    }
  },
  mounted() {

  }
}
</script>

<style lang="less">
.mu-item-wrapper{
  &.actived{
    .mu-item{
      color: #ff4081;
    }
  }
}
</style>
