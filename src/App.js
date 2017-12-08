import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import GameView from './components/GameView'
import GameVisualization from './components/GameVisualization'
import PlayerShots from './components/PlayerShots'
import PlayerGoals from './components/PlayerGoals'
import GameEventFeed from './components/GameEventFeed'
import PlayerInfo from './components/PlayerInfo'
import Standings from './components/Standings'
import Team from './components/Team'
import NavBar from './components/NavBar'

var moment = require('moment')

class App extends Component {

  constructor() {
    super()
    this.getLiveScores = this.getLiveScores.bind(this)
    this.getTeams = this.getTeams.bind(this)
    this.getLogos = this.getLogos.bind(this)
    this.setTime = this.setTime.bind(this)
    this.nextDay = this.nextDay.bind(this)
    this.prevDay = this.prevDay.bind(this)
    this.setGameId = this.setGameId.bind(this)
    this.getLiveData = this.getLiveData.bind(this)
    this.getStandings = this.getStandings.bind(this)
    this.getShotData = this.getShotData.bind(this)
    this.getTeamStats = this.getTeamStats.bind(this)
    this.state = {
      games: [],
      teams: [],
      time: "",
      currentGameId: undefined,
      liveGame: undefined,
      player: {
        shots: {}
      },
      standings: []
    }
  }

  componentDidMount() {
    this.setTime()
    this.getLiveScores()
    this.getTeams(this.state.time)
    this.getStandings()
    this.getShotData(8475765)
    this.getTeamStats()
    var interval = setInterval(this.getLiveScores, 100000)
  }

  setTime() {
    let next = moment.now()
    next = moment(next).format("YYYY-MM-DD")
    this.setState({time: next})
  }

  getStandings() {
    fetch('http://statsapi.web.nhl.com/api/v1/standings')
      .then( (res) => res.json())
      .then( (res) => {
        this.setState({standings: res['records']})
      })
  }

  getTeamStats() {
    fetch(`https://frozen-hollows-10128.herokuapp.com/http://www.nhl.com/stats/rest/team?isAggregate=false&reportType=basic&isGame=false&reportName=teamsummary&sort=[{%22property%22:%22points%22,%22direction%22:%22DESC%22},{%22property%22:%22wins%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018`)
      .then( (res) => res.json())
      .then( (res) => {
        this.setState({teamStats: res['data']})
      })
  }

  getLiveScores() {
    fetch(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=${this.state.time}&endDate=${this.state.time}&expand=schedule.teams,schedule.linescore,schedule.broadcasts,schedule.ticket,schedule.scoringplays,schedule.game.content.media.epg&leaderCategories=&site=en_nhl&teamId=`)
      .then( (res) => res.json())
      .then( (res) => {
        this.setState({games: res.dates[0]['games']})
      })
  }

  nextDay() {
    let next = moment(this.state.time).add(1, 'd').format("YYYY-MM-DD")
    this.setState({time: next}, this.getLiveScores)
  }

  prevDay() {
    let prev = moment(this.state.time).subtract(1, 'd').format("YYYY-MM-DD")
    this.setState({time: prev}, this.getLiveScores)
  }

  getTeams() {
    fetch("https://statsapi.web.nhl.com/api/v1/teams")
      .then( (res) => res.json())
      .then( (res) => {
        this.setState({teams: res['teams']})
      })
      .then( () => {
        this.getLogos()
      })
  }

  getShotData(id) {
    var proxyUrl = 'https://frozen-hollows-10128.herokuapp.com/',
    targetUrl = `http://www.nhl.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=shottype&sort=[{%22property%22:%22shots%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018%20and%20playerId=${id}`
    fetch(proxyUrl + targetUrl)
        .then( (res) => res.json())
        .then( (res) => {
            this.setState({player: {shots: res['data'][0]}})
        })
  }

  getLogos() {
    let newTeams = [...this.state.teams]
    newTeams.map( (team) => {
      let id = team['id']
      return team['image'] = `https://www-league.nhlstatic.com/builds/site-core/86d4b76cc03a4d111ee0e20f9f62eb054eef3b74_1502985652/images/logos/team/current/team-${id}-dark.svg`
    })
    this.setState({teams: newTeams})
  }

  setGameId (id) {
    this.setState({currentGameId: id}, () => {
      this.getLiveData(id)
    })
  }

  getLiveData (id) {
    fetch(`http://statsapi.web.nhl.com/api/v1/game/${id}/feed/live`)
      .then( (res) => res.json())
      .then( (res) => {
        this.setState({liveGame: res})
      })
  }

  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <div className="App">
        <NavBar/>
        <Route exact path="/" component={() => <Dashboard 
            getLiveData={this.getLiveData}
            games={this.state.games} 
            teams={this.state.teams} 
            time={moment(this.state.time).format("MMMM DD")}
            nextDay={this.nextDay}
            prevDay={this.prevDay}
            setGameId={this.setGameId}/>}
          />
          <Route path="/standings" component={() => <Standings
              games={this.state.games} 
              teams={this.state.teams} 
              time={moment(this.state.time).format("MMMM DD")}
              standings={this.state.standings}
            />}
          />
        <Route exact path="/game/:id" component={({match}) => <GameView 
            id={match.params.id}
            teams={this.state.teams}
            setGameId={this.setGameId}
            liveData={this.state.liveGame}
            currentGame={this.state.games.filter( (game) => {
              return game['gamePk'] === this.state.currentGameId
            })}
          />}
        />
        <Route exact path="/game/:id/events" component={() => <GameEventFeed
          teams={this.state.teams}
          liveData={this.state.liveGame}
          currentGame={this.state.games.filter( (game) => {
            return game['gamePk'] === this.state.currentGameId
          })}
          id={this.state.currentGameId}
         />}
        />
        <Route exact path="/game/:id/visualization" component={() => <GameVisualization 
          teams={this.state.teams}
          liveData={this.state.liveGame}
          currentGame={this.state.games.filter( (game) => {
            return game['gamePk'] === this.state.currentGameId
          })}
        />}
        />
        <Route exact path="/player/:id" component={({match}) => <PlayerInfo
          id={match.params.id}
          />}
        />

        <Route exact path="/teams/:id" component={({match}) => <Team
          id={match.params.id}
          teams={this.state.teams}
          standings={this.state.standings}
          teamStats={this.state.teamStats}
          />}
        />

        <Route exact path="/player/:id/shots" component={() => <PlayerShots 
          totalShots={this.state.player.shots['shots']}
          backhand={this.state.player.shots['shotsBackhand']}
          deflected={this.state.player.shots['shotsDeflected']}
          slap={this.state.player.shots['shotsSlap']}
          snap={this.state.player.shots['shotsSnap']}
          tipped={this.state.player.shots['shotsTipped']}
          wraparound={this.state.player.shots['shotsWraparound']}
          wrist={this.state.player.shots['shotsWrist']}
          name={this.state.player.shots['playerName']}
          />}
        />
        <Route exact path="/player/:id/goals" component={() => <PlayerGoals 
          totalShots={this.state.player.shots['goals']}
          backhand={this.state.player.shots['goalsBackhand']}
          deflected={this.state.player.shots['goalsDeflected']}
          slap={this.state.player.shots['goalsSlap']}
          snap={this.state.player.shots['goalsSnap']}
          tipped={this.state.player.shots['goalsTipped']}
          wraparound={this.state.player.shots['goalsWraparound']}
          wrist={this.state.player.shots['goalsWrist']}
          name={this.state.player.shots['playerName']}
          />}
        />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
