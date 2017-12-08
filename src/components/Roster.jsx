import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Roster extends Component {
    render() {
        let roster
        if (this.props.players !== undefined) {
            roster = this.props.players.roster.sort().map( (player) => {
                return (
                    <Link to={`/player/${player.person.id}`}  key={player.person.id}>
                    <div className="playerRow">
                            <div className="playerRowHeader">
                                <h2>{player.person.fullName}</h2>
                                <h2>#{player.jerseyNumber}&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{player.position.abbreviation}</h2>
                            </div>
                            <img alt="player" src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`} />
                    </div>
                    </Link>
                )
            })
        } else {
            roster = <div></div>
        }

        return (
            <div>
                <div className="h">
                    <h1>Roster</h1>
                </div>
                <div className="roster">
                    {
                        roster
                    }
                </div>
            </div>
        )
    }
}

export default Roster