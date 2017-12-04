import React, {Component} from 'react'

class ScoringPlays extends Component {
    render() {
        return (
            <div className="scoringPlays">
                {
                    this.props.scoringPlays.map( (play) => {
                        return (
                            <div className="scoringPlay" key={play['about']['eventIdx']}>
                                <h1>{play['about']['goals']['home']}</h1>
                                    <div className="scoringDescription">
                                        <h1>Goal ({play['team']['name']})</h1>
                                        <h2>{play['result']['description']}</h2>
                                    </div>
                                <h1>{play['about']['goals']['away']}</h1>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ScoringPlays