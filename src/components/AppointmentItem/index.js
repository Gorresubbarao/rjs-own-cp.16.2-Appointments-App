// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleIsStared} = props
  const {id, date, title, isStared} = eachAppointment

  const onClickStar = () => {
    toggleIsStared(id)
  }

  const starImageUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className='appointment-item'>
      <div className='header-container'>
        <p className='title'>{title}</p>
        <button
          data-testid='star'
          className='star-button'
          type='button'
          onClick={onClickStar}
        >
          <img src={starImageUrl} alt='star' className='star' />
        </button>
      </div>
      <p className='date'>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
