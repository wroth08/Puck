import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Division extends Component {
    render() {
        let division = this.props.standings.filter( (division) => {
            return division['division']['name'] === this.props.name
        })
        if (division[0] !== undefined) {
            return (
                <div className="division">
                    <h2>{this.props.name}</h2>
                    <div className="standingsrow">
                        <h2 className="standingsrowname">Team</h2>
                        <h2 className="standingsrowrecord">Record</h2>
                        <h2 className="standingsrowgamesplayed">Games Played</h2>
                        <h2 className="standingsrowpoints">Points</h2>
                    </div>
                    {
                        division[0]['teamRecords'].map( (team) => {
                            return (
                                <div className="standingsrow" key={team['team']['id']}>
                                    <h3 className="standingsrowname"><Link to={`/teams/${team['team']['id']}`}>{team['team']['name']}</Link></h3>
                                    <h3 className="standingsrowrecord">{team['leagueRecord']['wins']}-{team['leagueRecord']['losses']}-{team['leagueRecord']['ot']}</h3>
                                    <h3 className="standingsrowgamesplayed">{team['gamesPlayed']}</h3>
                                    <h3 className="standingsrowpoints">{team['points']}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return <div className="division"></div>
        }
    }
}

export default Division