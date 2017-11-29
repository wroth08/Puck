import React, {Component} from 'react'

import Period from './Period'
import BoxScore from './BoxScore'
import {Link} from 'react-router-dom'

class GameView extends Component {

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
                <div className="gameview">
                    <div className="singlegame">
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
                        <div className="detailed">
                            <div className="box">
                                <BoxScore 
                                    SOG={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['shots']}
                                    pim={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['pim']} 
                                    powerPlayGoals={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['powerPlayGoals']}
                                    powerPlayOpportunities={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['powerPlayOpportunities']}
                                    powerPlayPercentage={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['powerPlayPercentage']}
                                    blocked={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['blocked']}
                                    takeaways={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['takeaways']}
                                    giveaways={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['giveaways']}
                                    hits={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['hits']}
                                    faceOffWinPercentage={this.props.liveData['liveData']['boxscore']['teams']['home']['teamStats']['teamSkaterStats']['faceOffWinPercentage']}
                                />
                            </div>
                            <div className="periodInfo">
                                {
                                    this.props.liveData['liveData']['linescore']['periods'].map( (period) => {
                                        return <Period 
                                            key={period['ordinalNum']}
                                            homeScore={period['home']['goals']}
                                            homeSOG={period['home']['shotsOnGoal']}
                                            awayScore={period['away']['goals']}
                                            awaySOG={period['away']['shotsOnGoal']}
                                            periodNumber={period['ordinalNum']}
                                        />
                                    })
                                }
                            </div> 
                            <div className="box">
                                <BoxScore 
                                    SOG={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['shots']}
                                    pim={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['pim']} 
                                    powerPlayGoals={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['powerPlayGoals']}
                                    powerPlayOpportunities={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['powerPlayOpportunities']}
                                    powerPlayPercentage={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['powerPlayPercentage']}
                                    blocked={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['blocked']}
                                    takeaways={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['takeaways']}
                                    giveaways={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['giveaways']}
                                    hits={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['hits']}
                                    faceOffWinPercentage={this.props.liveData['liveData']['boxscore']['teams']['away']['teamStats']['teamSkaterStats']['faceOffWinPercentage']}
                                />
                            </div>
                        </div>
                </div>
                <Link to={`/game/${this.props.id}/visualization`}>
                    Visualize
                </Link>
            </div>
        )   
    } else {
        return (
            <div></div>
        )
    }
}
}

export default GameView