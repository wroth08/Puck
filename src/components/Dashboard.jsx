import React, {Component} from 'react'

import Game from './Game'

class Dashboard extends Component {



    render () {
        return (
            <div className="dashboard">
                <div className="date">
                    <div id="prev" onClick={this.props.prevDay}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="20" y1="12" x2="4" y2="12"></line><polyline points="10 18 4 12 10 6"></polyline></svg>
                    </div>
                    <h1>{this.props.time}</h1>
                    <div id="next" onClick={this.props.nextDay}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
                    </div>
                </div>
                {
                    this.props.games.map( (game) => {
                            var homeID = game['teams']['home']['team']['id']
                            var awayID = game['teams']['away']['team']['id']
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
                            var timeRemaining = game['linescore']['currentPeriodTimeRemaining']
                            if (game['linescore']['currentPeriod'] === 0) {
                                timeRemaining = game['gameDate']
                                timeRemaining = timeRemaining.substring(11, 19)
                                var hour = Number(timeRemaining.substring(0, 2))
                                hour = hour - 5
                                if (hour < 0) {
                                    hour = 12 + hour
                                }
                                hour = ("0" + hour).slice(-2)
                                timeRemaining = hour + timeRemaining.substring(2, 5) + " ET"
                            }
                            var period = game['linescore']['currentPeriodOrdinal']

                        return <Game
                            key={game['gamePk']}
                            homeName={game['teams']['away']['team']['name']}
                            homeScore={game['teams']['away']['score']}
                            homeLogo={homeImg || ""}
                            awayName={game['teams']['home']['team']['name']}
                            awayScore={game['teams']['home']['score']}
                            awayLogo={awayImg  || ""}
                            period={period}
                            timeRemaining={timeRemaining}
                            setGameId={this.props.setGameId}
                            getLiveData={this.getLiveData}
                            id={game['gamePk']}
                        />
                    })
                }
            </div>
        )
    }
}

export default Dashboard