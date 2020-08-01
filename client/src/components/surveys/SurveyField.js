import React from 'react'
import { reduxForm, Field  } from 'redux-form'

export default ({input, label, meta: {error, touched} }) => {
    //console.log(props.input)
    return (
        <div>
            <label>{label}</label>
            <input {...input} style = {{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                { touched && error }
            </div>
            
        </div>

    )
}