//TODO: Implement
//TODO: Document
const asyncValidation = (executable: Function) => {
  return {
    async _validate(value: any) {
      return await executable(value)
    },
    _message() {
      return "not implemented"
    }
  }
}
