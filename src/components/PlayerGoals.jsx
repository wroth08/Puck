import React, {Component} from 'react'

import PlayerGoalsLegend from './PlayerGoalsLegend'
import PlayerGoalsChart from './PlayerGoalsChart'

class PlayerGoals extends Component {
    render() {
        return (
            <div className="goalGraph">
                <PlayerGoalsLegend name={this.props.name}/>
                <PlayerGoalsChart 
                    totalShots={this.props.totalShots}
                    backhand={this.props.backhand}
                    deflected={this.props.deflected}
                    slap={this.props.slap}
                    snap={this.props.snap}
                    tipped={this.props.tipped}
                    wraparound={this.props.wraparound}
                    wrist={this.props.wrist}/>
            </div>
        )
    }
}

export default PlayerGoals