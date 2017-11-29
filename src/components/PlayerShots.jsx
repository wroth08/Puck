import React, {Component} from 'react'

import PlayerShotsLegend from './PlayerShotsLegend'
import PlayerShotsChart from './PlayerShotsChart'

class PlayerShots extends Component {
    render() {
        return (
            <div className="shotGraph">
                <PlayerShotsLegend name={this.props.name}/>
                <PlayerShotsChart 
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

export default PlayerShots