import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from "../../actions"


class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
       // renderSurveys();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className = "card darken-1" key = {survey._id}>
                    <div className = "card-content">
                        <span className = "card-title"> <p>{survey.body}</p>
                        <p>Sent On: {new Date (survey.dateSent).toLocaleDateString()}</p>
                        </span>

                    </div>
                    <div className ="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>

            )
        })
    }
    render() {
        //this.renderSurveys();
        return (
            
            <div>{this.renderSurveys()}</div>
        );
    }
}
//{survyes} is state decont
function mapStateToProps({surveys}) {
    return { surveys: surveys };
}

export default connect(mapStateToProps, { fetchSurveys})(SurveyList)