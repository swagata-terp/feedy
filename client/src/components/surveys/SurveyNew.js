//survey new shows survey form and the review

import React, { Component} from 'react'
import {reduxForm} from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFromReview from './SurveyFormReview'

class SurveyNew extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {new: true}
    // } same as below which uses babel

    state = {formReview: false};

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFromReview
            onCancel={() => this.setState({ showFormReview: false})}/>
        }
        return <SurveyForm
            onSurveySubmit={() => this.setState({ showFormReview: true})}
            />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
}) (SurveyNew);