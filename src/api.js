import data from './data'
import {API_HOST} from './config'
import superagent from 'superagent'

class Api {
  requestAvailabilities = () => {
    return Promise.resolve(data)
  }

  reqAvailabilities = (spec, date) => {
    return superagent
    .get(`${API_HOST}/availabilities?spec=${spec}&date=${date}`)
    .then(res => res.body)
  }

  sendBooking = (date, startTime, patientToken) => {
    return superagent
    .post(`${API_HOST}/booking`)
    .set('Authorization', 'token '+ patientToken)
    .send({
      date: date,
      startTime: startTime,
    })
  }
}

export default new Api();
