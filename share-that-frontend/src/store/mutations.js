export default {
  updateCurricula (state, curricula) {
    state.curricula = curricula
  },
  appendCurricula (state, curriculum) {
    state.curricula.push(curriculum)
  },
  updateSnackBar (state, snackBarSettings) {
    state.snackBar = {
      ...state.snackBar,
      ...snackBarSettings
    }
  }
}
