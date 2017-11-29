import React, {Component} from 'react'

class BoxScore extends Component {
    render() {
        return (
            <div className="boxscore">
                <div className="boxscore-row">
                    <h2>Shots (SOG):</h2>
                    <h2>{this.props.SOG}</h2>
                </div>
                <div className="boxscore-row">
                    <h2>Penalty<br/>minutes:</h2>
                    <h2>{this.props.pim}</h2>
                </div>
                <div className="boxscore-row">
                    <h2>PP:</h2>
                    <h2>{this.props.powerPlayGoals} / {this.props.powerPlayOpportunities} ({this.props.powerPlayPercentage}%)</h2>
                </div>
                <div className="boxscore-row">
                    <h2>Faceoffs<br/>won:</h2>
                    <h2>{this.props.faceOffWinPercentage}%</h2>
                </div>
                <div className="boxscore-row">
                    <h2>Blocked<br/>Shots:</h2>
                    <h2>{this.props.blocked}</h2>
                </div>
                <div className="boxscore-row">
                    <h2>Takeaways:</h2>
                    <h2>{this.props.takeaways}</h2>
                </div>
                <div className="boxscore-row">
                    <h2>Giveaways:</h2>
                    <h2>{this.props.giveaways}</h2>
                </div>
                <div className="boxscore-row">
                    <h2>Hits:</h2>
                    <h2>{this.props.hits}</h2>
                </div>
            </div>
        )
    }
}

export default BoxScore