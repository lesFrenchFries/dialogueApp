import {API_HOST} from './config'
import superagent from 'superagent'

class Api {

  reqAvailabilities = (spec, date, patientToken) => {
    return superagent
    .get(`${API_HOST}/availabilities?spec=${spec}&date=${date}`)
    .set('Authorization', 'Bearer '+ patientToken)
    .then(res => res.body)
  }

  sendBooking = (date, startTime, patientToken, spec) => {
    return superagent
    .post(`${API_HOST}/booking`)
    .set('Authorization', 'Bearer '+ patientToken)
    .send({
      date: date,
      startTime: startTime,
      spec:spec
    })
  }

  reqBookingInfo = (bookingId) => {
    return superagent
    .get(`${API_HOST}/booking/${bookingId}`)
    .then(res => res.body)
  }
}

export default new Api();
