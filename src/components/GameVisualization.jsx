import React, {Component} from 'react'
import {VictoryBar, VictoryAxis, VictoryStack, VictoryLabel} from 'victory'
  
  const width = 500;
  const height = 500;
  const padding = { top: 80, bottom: 80, left: 20, right: 20 };

class GameVisualization extends Component {
    render() {
        let game = this.props.liveData['liveData']['boxscore']['teams']
        let home = game['home']['teamStats']['teamSkaterStats']
        let formattedHome = []
        for (const prop in home) {
            formattedHome.push({x: prop, y: Number(home[prop])})
        }
        let away = game['away']['teamStats']['teamSkaterStats']
        let formattedAway = []
        for (const prop in away) {
            formattedAway.push({x: prop, y: Number(away[prop])})
        }
        formattedHome = formattedHome.reverse()
        formattedAway = formattedAway.reverse()

        return (
            <div className="game-chart">
                <svg viewBox={`0 0 ${width} ${height}`}
                style={{ width: "100%", height: "auto" }}
                 >
                <VictoryStack horizontal
                standalone={false}
                
                domain={{x: [-200, 200]}}
                padding={padding}
                height={height}
                width={width}
                style={{ data: { width: 20 }, labels: { fontSize: 12 } }}
                >
                <VictoryBar
                    style={{ data: { fill: "powderblue" } }}
                    data={formattedHome}
                    y={(data) => Number(-data.y)}
                    labels={(data) => `${data.x}: ${data.y}`}
                />
                <VictoryBar
                    style={{ data: { fill: "crimson" } }}
                    data={formattedAway}
                    labels={(data) => data.y}
                />
                </VictoryStack>
        
                <VictoryAxis dependentAxis
                height={height}
                width={width}
                padding={padding}
                style={{
                    axis: { stroke: "transparent" },
                    ticks: { stroke: "transparent" },
                    tickLabels: { fontSize: 11, fill: "black" }
                }}
                /*
                    Use a custom tickLabelComponent with
                    an absolutely positioned x value to position
                    your tick labels in the center of the chart. The correct
                    y values are still provided by VictoryAxis for each tick
                */
                tickLabelComponent={<VictoryLabel x={250} textAnchor="middle"/>}
                tickValues={formattedHome.map((point) => point.x).reverse()}
                />
            </svg>
          </div>
        )
    }
}

export default GameVisualization