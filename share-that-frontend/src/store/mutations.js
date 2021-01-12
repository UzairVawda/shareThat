export default {
  updateCurricula (state, curricula) {
    state.curricula = curricula
  },
  appendCurricula (state, curriculum) {
    state.curricula.push(curriculum)
  }
}
