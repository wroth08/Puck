import React, {Component} from 'react'

class Period extends Component {
    render() {
        return (
            <div className="period">
                <div className="periodhome">
                    <h1>Goals: {this.props.homeScore}</h1>
                    <h2>SOG: {this.props.homeSOG}</h2>
                </div>
                <div className="periodmiddle">
                    <h1>{this.props.periodNumber}</h1>
                    <h1>Period</h1>
                </div>
                <div className="periodaway">
                    <h1>Goals: {this.props.awayScore}</h1>
                    <h2>SOG: {this.props.awaySOG}</h2>
                </div>
            </div>
        )
    }
}

export default Period