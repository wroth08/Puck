import React, {Component} from 'react'
import {VictoryPie, VictoryLabel, VictoryTheme, VictoryLegend} from 'victory'
import CustomTheme from './CustomTheme'

class PlayerShotsChart extends Component {

    render() {

        var dataPre = [
            {x: this.props.wrist, y: this.props.wrist}, 
            {x: this.props.slap, y: this.props.slap}, 
            {x: this.props.snap, y: this.props.snap},
            {x: this.props.backhand, y: this.props.backhand},
            {x: this.props.deflected, y: this.props.deflected},
            {x: this.props.tipped, y: this.props.tipped},
            {x: this.props.wraparound, y: this.props.wraparound},
        ]

        var data = dataPre.map( (thing) => {
            if (thing.x === 0) {
                thing.x = ' '
            }
            return thing
        })

        return (
                <div className="chart">
                    <svg viewBox="0 0 800 800">
                        <VictoryPie
                        theme={CustomTheme}
                        standalone={false}
                        width={800} height={800}
                        data={data}
                        innerRadius={90} labelRadius={190}
                        style={{ labels: { fontSize: 50, fill: "white"}}}
                        />
                        <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 40 }}
                        x={400} y={400}
                        text={`${this.props.totalShots} Shots`}
                        />
                    </svg>
                </div>
        )
    }
}

export default PlayerShotsChart