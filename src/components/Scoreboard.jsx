import React, {Component} from 'react'

class Scoreboard extends Component {
    
    render() {

        if (this.props.liveData !== undefined && this.props.currentGame[0] !== undefined) {
            var homeID = this.props.liveData['gameData']['teams']['home']['id']
            var awayID = this.props.liveData['gameData']['teams']['away']['id']
            var homeImg = this.props.teams.filter( (team) => {
                return team.id === homeID
            })[0]
            if (homeImg !== undefined) {
                homeImg = homeImg.image
            }
            var awayImg = this.props.teams.filter( (team) => {
                return team.id === awayID
            })[0]
            if (awayImg !== undefined) {
                awayImg = awayImg.image
            }
            var timeRemaining = this.props.liveData['liveData']['linescore']['currentPeriodTimeRemaining']
            if (this.props.currentGame[0]['linescore']['currentPeriod'] === 0) {
                timeRemaining = this.props.currentGame[0]['gameDate']
                timeRemaining = timeRemaining.substring(11, 19)
                var hour = Number(timeRemaining.substring(0, 2))
                hour = hour - 5
                if (hour < 0) {
                    hour = 12 + hour
                }
                hour = ("0" + hour).slice(-2)
                timeRemaining = hour + timeRemaining.substring(2, 5) + " ET"
            }
            var period = this.props.liveData['liveData']['linescore']['currentPeriodOrdinal']
        return (
            <div className="scoreboard">
                <div className="home">
                    <img src={homeImg} alt="logo" height="200" width="200"/>
                    <h1>{this.props.liveData['liveData']['linescore']['teams']['home']['goals']}</h1>
                </div>
                <div className="middleInfoSmall">
                    <h2>{period}</h2>
                    <h1>{timeRemaining}</h1>
                </div>
                <div className="away">
                    <img src={awayImg} alt="logo" height="200" width="200"/>
                    <h1>{this.props.liveData['liveData']['linescore']['teams']['away']['goals']}</h1>
                </div>
            </div>
        ) 
        }
    }
}

export default Scoreboard