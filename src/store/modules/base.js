/**
 * @flie 发送同步action状态处理
 * @author Limtick
 * @date 2017-08-20
 */

import * as types from '@/constants'

export const state = {
  id: ''
}

export const mutations = {
  [types.CHANGE_ID](state, payload) {
    state.id = payload.id
  }
};
