// Write your code here

import './index.css'

import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  addApointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const dateInFormate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInFormate,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }
  toggleIsStared = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  staredAppointments = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  getFilterStaredAppointments = () => {
    const {isFilterActive, appointmentsList} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStared === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'

    const filteredAppointmentsLists = this.getFilterStaredAppointments()
    console.log(filteredAppointmentsLists)
    return (
      <div className="app-container">
        <div className="appointment-card">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.addApointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="lable" htmlFor="Title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="Title"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                  placeholder="Title"
                  className="input-element"
                />
                <label className="lable" htmlFor="Date">
                  DATE
                </label>
                <input
                  type="date"
                  id="Date"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                  className="input-element"
                />

                <button className="add-button" type="submit">
                  Add
                </button>
              </form>

              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="app-addApointment-img"
              />
            </div>
            <hr />
            <div className="appointment-stars-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`filter-style ${filterClassName}`}
                onClick={this.staredAppointments}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsLists.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  eachAppointment={eachAppointment}
                  toggleIsStared={this.toggleIsStared}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
