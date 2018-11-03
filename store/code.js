export const state = () => ({
  list: [],
  total: 0
})

export const mutations = {
  add(state, data) {
    state.list = data
  },
  total(state, data) {
    state.count = data
  }
}
