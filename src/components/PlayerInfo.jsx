import React, {Component} from 'react'
import Chart from 'chart.js';

class PlayerInfo extends Component {

    constructor() {
        super()
        this.getBasicPlayerInfo = this.getBasicPlayerInfo.bind(this)
        this.getSAT = this.getSAT.bind(this)
        this.getShotData = this.getShotData.bind(this)
        this.appendShotChart = this.appendShotChart.bind(this)
        this.appendGoalChart = this.appendGoalChart.bind(this)
        this.appendMissedChart = this.appendMissedChart.bind(this)
        this.getFaceoffData = this.getFaceoffData.bind(this)
        this.appendFaceoffzoneChart = this.appendFaceoffzoneChart.bind(this)
        this.state = {
            player: {
                fullName: "",
                primaryNumber: "",
                height: "",
                birthCity: "",
                birthCountry: "",
                weight: "",
                currentAge: "",
                currentTeam: {
                    name: ""
                },
                primaryPosition: {
                    abbreviation: ""
                },
            }, 
            advanced: {
                defensiveZoneFaceoffs: 0,
                fiveOnFiveShootingPctg: 0,
                gamesPlayed: 0,
                offensiveZoneFaceoffs: 0,
                shootingPlusSavePctg: 0,
                playerBirthCity: "",
                playerBirthCountry: "",
                playerBirthDate: "",
                playerBirthStateProvince: null,
                playerDraftOverallPickNo: 0,
                playerDraftRoundNo: 0,
                playerDraftYear: 0,
                playerFirstName: "",
                playerHeight: 0,
                playerId: 0,
                playerInHockeyHof: 0,
                playerIsActive: 0,
                playerLastName: "",
                playerName: "",
                playerNationality: "",
                playerPositionCode: "",
                playerShootsCatches: "",
                playerTeamsPlayedFor: "",
                playerWeight: 0,
                seasonId: 0,
                shotAttemptsPctg: 0,
                shotAttemptsPctgAhead: 0,
                shotAttemptsPctgBehind: 0,
                shotAttemptsPctgClose: 0,
                shotAttemptsPctgTied: 0,
                unblockedShotAttemptsPctg: 0,
                unblockedShotAttemptsPctgAhead: 0,
                unblockedShotAttemptsPctgBehind: 0,
                unblockedShotAttemptsPctgClose: 0,
                unblockedShotAttemptsPctgTied: 0,
                zoneStartPctg: 0
            },
            shots: {
                gamesPlayed: 0,
                goals: 0,
                goalsBackhand: 0,
                goalsDeflected: 0,
                goalsSlap: 0,
                goalsSnap: 0,
                goalsTipped: 0,
                goalsWraparound: 0,
                goalsWrist: 0,
                missedShots: 0,
                missedShotsHitCrossbar: 0,
                missedShotsHitPost: 0,
                missedShotsOverNet: 0,
                missedShotsWideOfNet: 0,
                playerBirthCity: "",
                playerBirthCountry: "",
                playerBirthDate: "",
                playerBirthStateProvince: null,
                playerDraftOverallPickNo: 0,
                playerDraftRoundNo: 0,
                playerDraftYear: 0,
                playerFirstName: "",
                playerHeight: 0,
                playerId: 0,
                playerInHockeyHof: 0,
                playerIsActive: 0,
                playerLastName: "",
                playerName: "",
                playerNationality: "",
                playerPositionCode: "",
                playerShootsCatches: "",
                playerTeamsPlayedFor: "",
                playerWeight: 0,
                seasonId: 0,
                shots: 0,
                shotsBackhand: 0,
                shotsDeflected: 0,
                shotsSlap: 0,
                shotsSnap: 0,
                shotsTipped: 0,
                shotsWraparound: 0,
                shotsWrist: 0
            },
            faceoffs: {
                faceoffLoss: 0,
                faceoffLossDefensiveZone: 0,
                faceoffLossNeutralZone: 0,
                faceoffLossOffensiveZone: 0,
                faceoffLossWhenAhead: 0,
                faceoffLossWhenBehind: 0,
                faceoffLossWhenClose: 0,
                faceoffWinPctg: 0,
                faceoffWinPctgDefensiveZone: 0,
                faceoffWinPctgNeutralZone: 0,
                faceoffWinPctgOffensiveZone: 0,
                faceoffWins: 0,
                faceoffWinsDefensiveZone: 0,
                faceoffWinsNeutralZone: 0,
                faceoffWinsOffensiveZone: 0,
                faceoffWinsWhenAhead: 0,
                faceoffWinsWhenBehind: 0,
                faceoffWinsWhenClose: 0,
                faceoffsTaken: 0,
                gamesPlayed: 0,
                playerBirthCity: "",
                playerBirthCountry: "",
                playerBirthDate: "",
                playerBirthStateProvince: "",
                playerDraftOverallPickNo: 0,
                playerDraftRoundNo: 0,
                playerDraftYear: 0,
                playerFirstName: "",
                playerHeight: 0,
                playerId: 0,
                playerInHockeyHof: 0,
                playerIsActive: 0,
                playerLastName: "",
                playerName: "",
                playerNationality: "",
                playerPositionCode: "",
                playerShootsCatches: "",
                playerTeamsPlayedFor: "",
                playerWeight: 0,
                seasonId: 0
            }
        }
    }

    componentDidMount() {
        this.getBasicPlayerInfo()
        this.getSAT()
        this.getShotData()
        this.getFaceoffData()
    }

    getBasicPlayerInfo() {
        fetch(`http://statsapi.web.nhl.com/api/v1/people/${this.props.id}`)
        .then( (res) => res.json())
        .then( (res) => {
            this.setState({player: res['people'][0]})
        })
    }

    getSAT() {
        var proxyUrl = 'https://frozen-hollows-10128.herokuapp.com/',
        targetUrl = `http://www.nhl.com/stats/rest/skaters?isAggregate=false&reportType=shooting&isGame=false&reportName=skaterpercentages&sort=[{%22property%22:%22shotAttemptsPctg%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018%20and%20playerId=${this.props.id}`
        fetch(proxyUrl + targetUrl)
            .then( (res) => res.json())
            .then( (res) => {
                this.setState({advanced: res['data'][0]})
        })
    }

    getShotData() {
        var proxyUrl = 'https://frozen-hollows-10128.herokuapp.com/',
        targetUrl = `http://www.nhl.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=shottype&sort=[{%22property%22:%22shots%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018%20and%20playerId=${this.props.id}`
        fetch(proxyUrl + targetUrl)
            .then( (res) => res.json())
            .then( (res) => {
                this.setState({shots: res['data'][0]})
            })
            .then( () => {
                this.appendShotChart()
                this.appendGoalChart()
                this.appendMissedChart()
            })
    }

    getFaceoffData() {
        var proxyUrl = 'https://frozen-hollows-10128.herokuapp.com/',
        targetUrl = `http://www.nhl.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=faceoffsbyzone&sort=[{%22property%22:%22faceoffWins%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20172018%20and%20seasonId%3C=20172018%20and%20playerId=${this.props.id}`
        fetch(proxyUrl + targetUrl)
            .then( (res) => res.json())
            .then( (res) => {
                console.log(res)
                this.setState({faceoffs: res['data'][0]})
            })
            .then( () => {
                this.appendFaceoffzoneChart()
            })
    }

    appendShotChart() {
        let shotnumbers = [this.state.shots.shotsWrist, this.state.shots.shotsSlap, this.state.shots.shotsSnap, this.state.shots.shotsBackhand, this.state.shots.shotsDeflected, this.state.shots.shotsTipped, this.state.shots.shotsWraparound]
        let title = `${this.state.shots.shots} Total Shots`
        let data = {
            datasets: [{
                data: shotnumbers,
                backgroundColor: [
                    '#77636E',
                    '#7F7CAF',
                    '#28587B',
                    '#9FB4C7',
                    '#444545',
                    'grey',
                    'darkgrey',
                    'black'
                ],
            }],
            labels: [
                'Wrist',
                'Slap',
                'Snap',
                'Backhand',
                'Deflected',
                'Tipped',
                'Wraparound',
            ],
            
        }
        let ctx = document.getElementById("shots")
        var shots = new Chart(ctx,{
            type: 'pie',
            data: data,
            options: {
                title: {
                    display: true,
                    text: title,
                    fontSize: 40
                }
            }
        })
    }

    appendGoalChart() {
        let goalnumbers = [this.state.shots.goalsWrist, this.state.shots.goalsSlap, this.state.shots.goalsSnap, this.state.shots.goalsBackhand, this.state.shots.goalsDeflected, this.state.shots.goalsTipped, this.state.shots.goalsWraparound]
        let title = `${this.state.shots.goals} Total Goals`
        let data = {
            datasets: [{
                data: goalnumbers,
                backgroundColor: [
                    '#77636E',
                    '#7F7CAF',
                    '#28587B',
                    '#9FB4C7',
                    '#444545',
                    'grey',
                    'darkgrey',
                    'black'
                ],
            }],
            labels: [
                'Wrist',
                'Slap',
                'Snap',
                'Backhand',
                'Deflected',
                'Tipped',
                'Wraparound',
            ],
            
        }
        let ctx = document.getElementById("goals")
        var shots = new Chart(ctx,{
            type: 'pie',
            data: data,
            options: {
                title: {
                    display: true,
                    text: title,
                    fontSize: 40
                }
            }
        })
    }

    appendMissedChart() {
        let missednumbers = [this.state.shots.missedShotsWideOfNet, this.state.shots.missedShotsHitCrossbar, this.state.shots.missedShotsHitPost, this.state.shots.missedShotsOverNet]
        let title = `${this.state.shots.missedShots} Missed Shots`
        let data = {
            datasets: [{
                data: missednumbers,
                backgroundColor: [
                    '#537251',
                    '#404e74',
                    '#558d74',
                    '#9ea87d',

                ],
            }],
            labels: [
                'Wide',
                'Crossbar',
                'Post',
                'Over Net',
            ],
            
        }
        let ctx = document.getElementById("missed")
        var shots = new Chart(ctx,{
            type: 'pie',
            data: data,
            options: {
                title: {
                    display: true,
                    text: title,
                    fontSize: 40
                }
            }
        })
    }

    appendFaceoffzoneChart() {
        let zones = [this.state.faceoffs.faceoffWinPctg * 100, this.state.faceoffs.faceoffWinPctgOffensiveZone * 100, this.state.faceoffs.faceoffWinPctgNeutralZone * 100, this.state.faceoffs.faceoffWinPctgDefensiveZone * 100]
        let data = {
            datasets: [{
                data: zones,
                backgroundColor: [
                    '#77636E',
                    '#7F7CAF',
                    '#28587B',
                    '#9FB4C7',
                ],
                label: "Faceoff Zone Win %"
            }],
            labels: [
                'Overall',
                'Offensive Zone',
                'Neutral Zone',
                'Defensive Zone',
            ],
        }
        let ctx = document.getElementById("faceoffzone")
        new Chart(ctx, {
            type: 'horizontalBar',
            data: data,
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Faceoff Win %',
                fontSize: 40
              },
              scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0,
                        stepSize: 10,
                        suggestedMax: 100,
                    }
                }]
            }
            }
        });
    }

    

    render() {
        return (
            <div className="playerPosition">
                <img className="playerPhoto" src={`https://nhl.bamcontent.com/images/actionshots/${this.props.id}.jpg`} alt="player"/>
                <div className="player">
                    <div className="playerHeader">
                        <h1>#{this.state.player['primaryNumber']} {this.state.player['fullName']}</h1>
                        <h2>{this.state.player['primaryPosition']['abbreviation']} for the {this.state.player['currentTeam']['name']}</h2>
                        <h3>{this.state.player['currentAge']} years old | {this.state.player['height']} | {this.state.player['weight']} lbs.</h3>
                        <h3>From {this.state.player['birthCity']}, {this.state.player['birthCountry']}</h3>
                    </div>
                </div>
                <div className="seasonTotalCharts">
                    <h1>Season Totals</h1>
                    <div className="seasonTotals">
                        <div className="seasonTotalsRow">
                            <div className="chart">
                                <canvas height="400" id="shots"/>
                            </div>
                            <div className="chart">
                                <canvas height="400" id="missed"/>
                            </div>
                            <div className="chart">
                                <canvas height="400" id="goals"/>
                            </div>
                        </div>
                        <div className="seasonTotalsFaceoffRow">
                        <div className="chart2">
                            <canvas height="100" id="faceoffzone"/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerInfo