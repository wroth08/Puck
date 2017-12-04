import React, {Component} from 'react'

import Division from './Division'

class Conference extends Component {
    render() {
        return (
            <div className="conference">
                <h1>{this.props.name}</h1>
                {
                    this.props.divisions.map( (division) => {
                       return <Division name={division} standings={this.props.standings} key={division}/>
                    })
                }
            </div>
        )
    }
}

export default Conference