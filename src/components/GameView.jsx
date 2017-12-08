import React, {Component} from 'react'

import Period from './Period'
import BoxScore from './BoxScore'
import GameEventFeed from './GameEventFeed'
import Scoreboard from './Scoreboard'
import ScoringPlays from './ScoringPlays'

class GameView extends Component {

    constructor() {
        super()
        this.state = {
            
        }
    }

    componentDidMount() {
        if (this.props.currentGame === undefined) {
            
        }
    }

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
        return (
                <div className="gameview">
                    <div className="singlegame">
                        <Scoreboard liveData={this.props.liveData} currentGame={this.props.currentGame} teams={this.props.teams}/>
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
                <ScoringPlays 
                    scoringPlays={this.props.currentGame[0]['scoringPlays']}
                    teams={this.props.teams}
                 />
                <GameEventFeed
                teams={this.props.teams}
                liveData={this.props.liveData}
                currentGame={this.props.currentGame}
                id={this.props.id}
               />
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