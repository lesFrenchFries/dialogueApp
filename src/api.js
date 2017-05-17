import data from './data'

class Api {
  requestAvailabilities = () => {
    return Promise.resolve(data)
  }
}

export default new Api();
