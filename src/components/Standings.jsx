import React, {Component} from 'react'

import Conference from './Conference'

class Standings extends Component {
    render() {
        return (
            <div className="standings">
                <Conference name="Western" divisions={['Central', 'Pacific']} standings={this.props.standings}/>
                <Conference name="Eastern" divisions={["Atlantic", "Metropolitan"]} standings={this.props.standings}/>
            </div>
        )
    }
}

export default Standings