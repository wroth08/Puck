import React, {Component} from 'react'

class Team extends Component {

    constructor () {
        super()
        this.getTeamData = this.getTeamData.bind(this)
        this.setLogo = this.setLogo.bind(this)
        this.getTeamStats = this.getTeamStats.bind(this)
        this.getStanding = this.getStanding.bind(this)
        this.state = {
            team: {

            },
            img: '',
            teamStats: {

            },
            standing: {
                leagueRecord: {
                    wins: undefined,
                    losses: undefined,
                    ot: undefined
                }
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
        fetch(`http://statsapi.web.nhl.com/api/v1/teams/${this.props.id}`)
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
                this.setState({teamStats: res['data'][0]})
            })
    }

    getStanding() {
        for (let i = 0; i < this.props.standings.length; i++) {
            for (let j = 0; j < this.props.standings[i]['teamRecords'].length; j++) {
                if (this.props.standings[i]['teamRecords'][j]['team']['id'] == this.props.id) {
                    let standing = this.props.standings[i]['teamRecords'][j]
                    console.log(standing)
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
                <div>
                    <h1>{this.state.team.name}</h1>
                    <h2>{this.state.standing.leagueRecord.wins}-{this.state.standing.leagueRecord.losses}-{this.state.standing.leagueRecord.ot} (#{this.state.standing.divisionRank} in division)</h2>
                </div>
            </div>
        )
    }
}

export default Team