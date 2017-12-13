# CrossCheck

CrossCheck is an app with two different versions:
  * A web app deployed at crosscheck.surge.sh
  * An Electron-based desktop app viewable in this repo's test branch

CrossCheck gives live (~ every 5 seconds) updates from NHL games. These updates include live scores, information on goal scorers and assists, game statistics, player season statistics, and team season statistics. 
It also provides a few (and more to come) visualizations and charts of those statistics.

Will blast your ears off with the goal horn if you're not careful with volume. (!!!)

CrossCheck is mobile-compatible and soon to be tablet-compatible as well.

## Web App Info
* Uses the HTML5 notification API to deliver alerts when goals are scored, and as such will ask for permission for notifications
* Built using HTML5, pure CSS3 (no frameworks), JavaScript, React, and Chart.js
* Bounces through a hobby Heroku CORS proxy, so if unresponsive allow 15-30 seconds for the Heroku dyno to spin up

## Desktop App Info
* Will send desktop notifications rather than through the browser
* Is set to open at a width of 400px, to be set side-by-side while working on/doing something else like so:
[Electron example](http://github.com/wroth08/puck/blob/electronexample.png)
* Can also be run in full-screen like the web app
* Built with the aforementioned technologies, as well as Electron

## Not included in this repo
* A React Native app for filtering notifications by team
* A small server based on Node, Express, and PostgreSQL to save preferences

### To do in near future
* Tablet-compatible
* Advanced statistics (corsi, fenwick, pdo, etc.)
* Fix goalie bug
* Actual physical goal horn
* Additional React Native capabilities (push notifications?)
* Milestones
* Email summary?
* ???

