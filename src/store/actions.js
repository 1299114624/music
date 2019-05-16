import * as types from './mutation-types'

export const SELECT_SONG = function ({commit}, {list, song, index}) {
    commit(types.SET_PLAY_LIST, list)
    commit(types.SET_SONG_SEQUENCE, list)
    commit(types.SET_CURRENT_SONG, song)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)
  }