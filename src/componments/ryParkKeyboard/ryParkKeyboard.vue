<template>
  <div class="keyboard">
    <div class="menu" v-show="keyShowZh">
      <ul>
        <li
          v-for= '(list, index) in keyList1'
          :key= "index"
          @click= 'textList({list: list})'>{{list}}</li>
      </ul>
      <ul>
        <li
          v-for= '(list, index) in keyList2'
          :key= 'index'
          @click= 'textList({list: list})'>{{list}}</li>
      </ul>
      <ul>
        <li class="key-letter"></li>
        <li
          v-for= '(list, index) in keyList3'
          :key= 'index'
          @click= 'textList({list: list})'>{{list}}</li>
        <li class="key-letter"></li>
      </ul>
      <ul>
        <li class="key-visibility"></li>
        <li
          v-for= '(list, index) in keyList4'
          :key= 'index'
          @click= 'textList({list: list})'>{{list}}</li>
        <li class="key-visibility"></li>
      </ul>
    </div>
    <div class="menu" v-show="keyShowOther">
      <ul v-show="keyShowNu">
        <li
          v-for= '(list, index) in keyList8'
          :key= 'index'
          @click= 'textList({list: list})'
        >{{list}}</li>
      </ul>
      <ul v-show="!keyShowNu">
        <li
          v-for= '(list, index) in keyList8'
          :key= 'index'
          class="no-click">{{list}}</li>
      </ul>
      <ul>
        <li
          v-for= '(list, index) in keyList5'
          :key= 'index'
          @click= 'textList({list: list})'
          :class="{'no-click':list == 'I' || list == 'O'}">{{list}}</li>
      </ul>
      <ul>
        <!-- <li class="key-letter"></li> -->
        <li
          v-for= '(list, index) in keyList6'
          :key= 'index'
          @click= 'textList({list: list})'>{{list}}</li>
        <!-- <li class="key-letter"></li> -->
      </ul>
      <ul>
        <li class="key-close" @click="completeHandler">完成</li>
        <li
          v-for= '(list, index) in keyList7'
          :key= 'index'
          @click= 'textList({list: list})'
          :class="[!keyShowSpecial && (list === '港' || list === '澳')
            ? 'no-click' : '']">{{list}}</li>
        <li class="key-datale" @click="deleteHandler">删除</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'ryParkKeyboard',
  props: {
    keyShowZh: {
      type: Boolean,
    },
    keyShowNu: {
      type: Boolean,
    },
    keyShowOther: {
      type: Boolean,
    },
    // 特别行政区
    keyShowSpecial: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      keyList1: ['京', '沪', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '苏'],
      keyList2: ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '贵'],
      keyList3: ['粤', '琼', '渝', '川', '桂', '云', '藏'],
      keyList4: ['陕', '甘', '青', '宁', '新'],
      // keyList5: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      keyList5: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
      // keyList6: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X'],
      keyList6: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'],
      // keyList7: ['C', 'V', 'B', 'N', 'M', '港', '澳', '学', '领'],
      keyList7: ['W', 'X', 'Y', 'Z', '港', '澳'],
      keyList8: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      keyI: 'I',
      keyO: 'O',
    }
  },
  computed: {
    keyClassIO () {
      return true
    },
  },
  methods: {
    textList (params) {
      if (params.list === 'I' || params.list === 'O') {
        return false
      }
      if (!this.keyShowSpecial &&
        (params.list === '港' || params.list === '澳')) {
        return
      }
      this.$emit('parkNoHandler', params.list)
    },
    completeHandler () {
      this.$emit('completeHandler')
    },
    deleteHandler () {
      this.$emit('deleteHandler')
    },
  },
}
</script>
<style lang="less" scoped="scoped" rel="stylesheet/less">
@import "./ryParkKeyboard.less";
</style>
