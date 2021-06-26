import React from "react";
import markdown from "./markdown/home.md"
import MdPage from "./MdPage"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { markdown: null }
  }

  render() {
    return (
      <div className="about">
        <div class="container justify-content-center">
          <div class="row justify-content-md-center my-5">
            <div class="col-lg-6 justify-content-center text-center">
              <h1 class="text-center">2020 Champion: Vaughan</h1>
              <img
                class="img-fluid rounded mx-auto mb-4 mb-lg-0"
                align="center"
                src="https://scontent-bos3-1.xx.fbcdn.net/v/t1.6435-9/45462756_10212187387789649_3623023416342216704_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=GYVgtxG8f4MAX8o9BgM&_nc_ht=scontent-bos3-1.xx&oh=517e84a4a0562c1f39ec63e2963b63f3&oe=60DB68B9"
                alt="file"
              />
            </div>
          </div>
          
          <hr class="col-lg-6 mx-auto"/>

          <div class="row justify-content-md-center my-5">
          
            <div class="col-lg-3">
              <h3>Past Champs</h3>
              <ul>
                <li>2020: Vaughan (60-26-4)*</li>
                <li>2019: Drix (132-63-15)</li>
                <li>2018: AJ (119-83-8)</li>
                <li>2017: Vaughan (127-67-16)</li>
                <li>2016: Mac (117-78-15)</li>
                <li>2015: Vaughan (110-87-13)</li>
                <li>2014: Drix (117-85-8)</li>
                <li>2013: AJ (119-78-13)</li>
                <li>2012: Drix (129-58-13)</li>
              </ul>
              <p>*COVID</p>
            </div>
            <div class="col-lg-3">
              <h3 class="">Links</h3>
              <ul>
                <li><a href="https://fantasy.espn.com/baseball/league?leagueId=128975" target="_">ESPN League Home</a></li>
                <li><a href="https://www.fantasypros.com/mlb/" target="_">FantasyPros - MLB</a></li>
                <li><a href="/Draft">Draft</a></li>
                <li><a href="/Rules">Rulebook</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
