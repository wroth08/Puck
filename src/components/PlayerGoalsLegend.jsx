import React, {Component} from 'react'
import {VictoryLegend} from 'victory'

class PlayerGoalsLegend extends Component {
    render() {
        return (
            <div className="legend">
                <VictoryLegend x={150} y={-30}
                    title={this.props.name + "\n Goal Chart"}
                    centerTitle
                    orientation="vertical"
                    gutter={10}
                    style={{ border: { stroke: "black" }, title: {fontSize: 30 }, labels: {fontSize: 18} }}
                    data={[
                        { name: "Wrist", symbol: { fill: "#77636E" } },
                        { name: "Slap", symbol: { fill: "#7F7CAF" } },
                        { name: "Snap", symbol: { fill: "#28587B" } },
                        { name: "Backhand", symbol: { fill: "#9FB4C7" } },
                        { name: "Deflected", symbol: { fill: "#444545" } },
                        { name: "Tipped", symbol: { fill: "grey" } },
                        { name: "Wraparound", symbol: { fill: "darkgrey" } },
                    ]}
                />
            </div>
        )
    }
}

export default PlayerGoalsLegend