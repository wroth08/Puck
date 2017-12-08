import React, {Component} from 'react'

import Roster from './Roster'

class Team extends Component {

    constructor () {
        super()
        this.getTeamData = this.getTeamData.bind(this)
        this.setLogo = this.setLogo.bind(this)
        this.getTeamStats = this.getTeamStats.bind(this)
        this.getStanding = this.getStanding.bind(this)
        this.setRanks = this.setRanks.bind(this)
        this.getRank = this.getRank.bind(this)
        this.state = {
            team: {

            },
            img: '',
            teamStat: {

            },
            standing: {
                leagueRecord: {
                    wins: undefined,
                    losses: undefined,
                    ot: undefined
                }
            },
            rankInLeague: {

            }
        }
    }

    componentDidMount() {
        this.getTeamData()
        this.setLogo()
        this.getTeamStats()
        this.getStanding()
    }

    getTeamData() {
        fetch(`http://statsapi.web.nhl.com/api/v1/teams/${this.props.id}?expand=team.roster`)
            .then( (res) => res.json())
            .then( (res) => {
                this.setState({team: res['teams'][0]})
            })
    }

    getTeamStats() {
        var proxyUrl = 'https://frozen-hollows-10128.herokuapp.com/'
        fetch(proxyUrl + `http://www.nhl.com/stats/rest/team?isAggregate=false&reportType=basic&isGame=false&reportName=teamsummary&sort=[{%22property%22:%22points%22,%22direction%22:%22DESC%22},{%22property%22:%22wins%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018%20and%20teamId=${this.props.id}`)
            .then( (res) => res.json())
            .then( (res) => {
                this.setState({teamStat: res['data'][0]})
            })
            .then( () => this.setRanks())
    }

    setRanks() {
        let faceoffrank = this.getRank('faceoffWinPctg')
        let goalsAgainst = this.getRank('goalsAgainstPerGame')
        let goalsFor = this.getRank('goalsForPerGame')
        let pkpctg = this.getRank('pkPctg')
        let pppctg = this.getRank('ppPctg')
        let shotsFor = this.getRank('shotsForPerGame')
        let shotsAgainst = this.getRank('shotsAgainstPerGame')
        let rankInLeague = {
            faceoffrank: faceoffrank,
            goalsAgainst: goalsAgainst,
            goalsFor: goalsFor,
            pkpctg: pkpctg,
            pppctg: pppctg,
            shotsFor: shotsFor,
            shotsAgainst: shotsAgainst,
        }
        this.setState({rankInLeague: rankInLeague})
    }

    getRank(value) {
        if (this.props.teamStats !== undefined && this.state.teamStat !== undefined) {
            let stats = this.props.teamStats
            .map( (team) => {
                return team[value]
            })
            stats.sort().reverse()
            let faceoffrank = stats.indexOf(this.state['teamStat'][value])
            return faceoffrank + 1
        }
    }

    getStanding() {
        for (let i = 0; i < this.props.standings.length; i++) {
            for (let j = 0; j < this.props.standings[i]['teamRecords'].length; j++) {
                if (this.props.standings[i]['teamRecords'][j]['team']['id'] == this.props.id) {
                    let standing = this.props.standings[i]['teamRecords'][j]
                    this.setState({standing: this.props.standings[i]['teamRecords'][j]})
                }
            }
        }
    }

    setLogo() {
        this.setState({img: `https://www-league.nhlstatic.com/builds/site-core/86d4b76cc03a4d111ee0e20f9f62eb054eef3b74_1502985652/images/logos/team/current/team-${this.props.id}-dark.svg`})
    }

    render() {
        return (
            <div className="teamInfo">
                <img src={this.state.img} alt="team-logo" className="teamImg"
                />
                <div className="teamstuff">
                    <h1>{this.state.team.name}</h1>
                    <h2>{this.state.standing.leagueRecord.wins}-{this.state.standing.leagueRecord.losses}-{this.state.standing.leagueRecord.ot} (#{this.state.standing.divisionRank} in division)</h2>
                </div>
                <h1>Faceoff Win %: {(this.state.teamStat.faceoffWinPctg * 100).toFixed(2)}% (#{this.state.rankInLeague['faceoffrank']} in league)</h1>
                <h1>Goals For Per Game: {(this.state.teamStat.goalsForPerGame)} (#{this.state.rankInLeague['goalsFor']} in league)</h1>
                <h1>Goals Against Per Game: {(this.state.teamStat.goalsAgainstPerGame)} (#{this.state.rankInLeague['goalsAgainst']} in league)</h1>
                <h1>Shots For Per Game: {(this.state.teamStat.shotsForPerGame)} (#{this.state.rankInLeague['shotsFor']} in league)</h1>            
                <h1>Shots Against Per Game: {(this.state.teamStat.shotsAgainstPerGame)} (#{this.state.rankInLeague['shotsAgainst']} in league)</h1>       
                <Roster 
                    players ={this.state.team.roster}
                />         
            </div>
        )
    }
}

export default Team