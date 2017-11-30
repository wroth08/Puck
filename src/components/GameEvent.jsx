import React, {Component} from 'react'

import {Link} from 'react-router-dom'

class GameEvent extends Component {
    render() {
        let event = <div>
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        <h1>{this.props.play}</h1>
                    </div>
        let description = <h1>{this.props.play}</h1>
        if (this.props.type === "Faceoff") {
            let winner = this.props.players[0]['player']
            let loser = this.props.players[1]['player']
            description = <h1><Link to={`/player/${winner.id}`}>{winner.fullName}</Link> faceoff won vs <Link to={`/player/${loser.id}`}>{loser.fullName}</Link></h1>
            event = <div className="faceoff">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Period Start" || this.props.type === "Period End" || this.props.type === "Period Ready" || this.props.type === "Game End" || this.props.type === "Game Scheduled"|| this.props.type === "Period Official") {
            description = <h1>{this.props.play}</h1>
            event = <div className="timeEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Shot") {
            let shooter = this.props.players[0]['player']
            let goalie = " "
            if (this.props.players[1]['player'] !== undefined) {
                goalie = this.props.players[1]['player']
                description = <h1><Link to={`/player/${shooter.id}`}>{shooter.fullName}</Link> {this.props.shotType.toLowerCase()} saved by <Link to={`/player/${goalie.id}`}>{goalie.fullName}</Link></h1>
                event = <div className="shotEvent">
                            <h2>{this.props.time} left in period {this.props.period}</h2>
                            {description}
                        </div>
            }
        } else if (this.props.type === "Missed Shot") {
            let shooter = this.props.players[0]['player']
            description = <h1><Link to={`/player/${shooter.id}`}>{shooter.fullName}</Link> shoots wide</h1>
            event = <div className="missedShotEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Blocked Shot") {
            let blocker = this.props.players[0]['player']
            let shooter = this.props.players[1]['player']
            description = <h1><Link to={`/player/${shooter.id}`}>{shooter.fullName}</Link> shot, blocked by <Link to={`/player/${blocker.id}`}>{blocker.fullName}</Link></h1>
            event = <div className="missedShotEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Goal") {
            let scorer = this.props.players[0]
            let firstAssist = ""
            let secondAssist = ""
            if (this.props.players[1] !== undefined && this.props.players[2] !== undefined) {
                firstAssist = this.props.players[1]
                secondAssist = this.props.players[2]
                description = <h1>GOAL scored by <Link to={`/player/${scorer.player.id}`}>{scorer.player.fullName} ({scorer.seasonTotal})</Link></h1>
                event = <div className="goalEvent">
                            <h2>{this.props.time} left in period {this.props.period}</h2>
                            {description}
                            <h1>Assists: <Link to={`/player/${firstAssist.player.id}`}>{firstAssist.player.fullName}</Link>, <Link to={`/player/${secondAssist.player.id}`}>{secondAssist.player.fullName}</Link></h1>
                        </div>
            } else if (this.props.players[1] !== undefined) {
                firstAssist = this.props.players[1]
                description = <h1>GOAL scored by <Link to={`/player/${scorer.player.id}`}>{scorer.player.fullName} ({scorer.seasonTotal})</Link></h1>
                event = <div className="goalEvent">
                            <h2>{this.props.time} left in period {this.props.period}</h2>
                            {description}
                            <h1>Assisted by: <Link to={`/player/${firstAssist.player.id}`}>{firstAssist.player.fullName}</Link></h1>
                        </div>
            } else {
                description = <h1>GOAL scored by <Link to={`/player/${scorer.player.id}`}>{scorer.player.fullName} ({scorer.seasonTotal})</Link></h1>
                event = <div className="goalEvent">
                            <h2>{this.props.time} left in period {this.props.period}</h2>
                            {description}
                        </div>
            }
        } else if (this.props.type === "Hit") {
            let hitter = this.props.players[0]['player']
            let hittee = this.props.players[1]['player']
            description = <h1><Link to={`/player/${hitter.id}`}>{hitter.fullName}</Link> hit <Link to={`/player/${hittee.id}`}>{hittee.fullName}</Link></h1>
            event = <div className="regularEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Giveaway") {
            let player = this.props.players[0]['player']
            description = <h1>Giveaway by <Link to={`/player/${player.id}`}>{player.fullName}</Link></h1>
            event = <div className="regularEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Takeaway") {
            let player = this.props.players[0]['player']
            description = <h1>Takeaway by <Link to={`/player/${player.id}`}>{player.fullName}</Link></h1>
            event = <div className="regularEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Stoppage") {
            description = <h1>Stoppage: {this.props.play}</h1>
            event = <div className="regularEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        {description}
                    </div>
        } else if (this.props.type === "Penalty") {
            if (this.props.players[1] !== undefined) {
                let penaltyOn = this.props.players[0]['player']
                let penaltyDrawnBy = this.props.players[1]['player']
                description = <h1>{this.props.penaltySeverity} Penalty ({this.props.shotType}) on <Link to={`/player/${penaltyOn.id}`}>{penaltyOn.fullName}</Link></h1>
                event = <div className="penaltyEvent">
                            <h2>{this.props.time} left in period {this.props.period}</h2>
                            {description}
                            <h1>Drawn by <Link to={`/player/${penaltyDrawnBy.id}`}>{penaltyDrawnBy.fullName}</Link></h1>
                        </div>
            } else {
                let penaltyOn = this.props.players[0]['player']
                description = <h1>{this.props.penaltySeverity} Penalty ({this.props.shotType}) on <Link to={`/player/${penaltyOn.id}`}>{penaltyOn.fullName}</Link></h1>
                event = <div className="penaltyEvent">
                            <h2>{this.props.time} left in period {this.props.period}</h2>
                            {description}
                        </div>
            }
        } else {
            event = <div className="regularEvent">
                        <h2>{this.props.time} left in period {this.props.period}</h2>
                        <h1>{this.props.play}</h1>
                    </div>
        }
        

        return (
            <div className="gameEvent">
                {event}
            </div>
        )
    }
}

export default GameEvent