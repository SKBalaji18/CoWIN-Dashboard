import Loader from 'react-loader-spinner'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    vacByAge: [],
    vacCoverage: [],
    vacByGender: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      const updatedCoverageData = updatedData.last7DaysVaccination.map(
        eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        }),
      )

      this.setState({
        apiStatus: apiStatusConstant.success,
        vacCoverage: updatedCoverageData,
        vacByAge: updatedData.vaccinationByAge,
        vacByGender: updatedData.vaccinationByGender,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {vacByAge, vacByGender, vacCoverage} = this.state
    return (
      <>
        <VaccinationCoverage vacCoverage={vacCoverage} />
        <VaccinationByGender vacByGender={vacByGender} />
        <VaccinationByAge vacByAge={vacByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="fail-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-head">Something went wrong</h1>
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="page-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-img"
            />
            <p className="logo-title">Co-Win</p>
          </div>
          <h1 className="page-title">CoWIN Vaccination in India</h1>
          {this.renderResult()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
