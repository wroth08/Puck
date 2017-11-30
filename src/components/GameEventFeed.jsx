import React, {Component} from 'react'

import GameEvent from './GameEvent'

class GameEventFeed extends Component {
    render() {
        return (
            <div className="eventfeed">
                {
                    this.props.liveData['liveData']['plays']['allPlays'].reverse().map( (play) => {
                        return <GameEvent key={play['about']['eventIdx']}
                            period={play['about']['period']}
                            time={play['about']['periodTimeRemaining']}
                            play={play['result']['description']}
                            type={play['result']['event']}
                            players={play['players']}
                            shotType={play['result']['secondaryType']}
                            penaltySeverity={play['result']['penaltySeverity']}
                        />
                    })
                }
            </div>
        )
    }
}

export default GameEventFeed