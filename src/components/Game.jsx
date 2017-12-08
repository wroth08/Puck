import React, {Component} from 'react'
import {Link} from 'react-router-dom'
  

class Game extends Component {

    constructor() {
        super()
        this.setGameId = this.setGameId.bind(this)
    }

    setGameId() {
        let id = this.props.id
        this.props.setGameId(id)
    }

    render() {
        return(
                <Link to={`/game/${this.props.id}`} className="game" onClick={this.setGameId}>
                    <div className="home">
                        <div className="nameLogo">
                            <h1>{this.props.homeName}</h1>
                            <img src={this.props.awayLogo} alt="logo"/>
                        </div>
                        <h2>{this.props.homeScore}</h2>
                    </div>
                    <div className="middleInfo">
                        <h2>{this.props.period}</h2>
                        <h1>{this.props.timeRemaining}</h1>
                    </div>
                    <div className="away">
                        <div className="nameLogo">
                            <h1>{this.props.awayName}</h1>
                            <img src={this.props.homeLogo} alt="logo"/>
                        </div>
                        <h2>{this.props.awayScore}</h2>
                    </div>
                </Link>
        )
    }
}

export default Game