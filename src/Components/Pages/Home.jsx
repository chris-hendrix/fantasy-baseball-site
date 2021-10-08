import React from 'react';
import champImage from './images/champ.jpg';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { markdown: null };
	}

	render() {
		return (
			<div className='home'>
				<div class='container justify-content-center'>
					<div class='row justify-content-md-center my-5'>
						<div class='col-lg-6 justify-content-center text-center'>
							<h1 class='text-center'>2021 Champion: Vaughan</h1>
							<img
								class='img-fluid rounded mx-auto mb-4 mb-lg-0'
								align='center'
								src={champImage}
								alt='file'
							/>
						</div>
					</div>

					<hr class='col-lg-6 mx-auto' />

					<div class='row justify-content-md-center my-5'>
						<div class='col-lg-3'>
							<h3>Past Champs</h3>
							<ul>
								<li>2021: Vaughan (127-71-12)</li>
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
						<div class='col-lg-3'>
							<h3 class=''>Links</h3>
							<ul>
								<li>
									<a href='https://fantasy.espn.com/baseball/league?leagueId=128975' target='_'>
										ESPN League Home
									</a>
								</li>
								<li>
									<a href='https://www.fantasypros.com/mlb/' target='_'>
										FantasyPros - MLB
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class='row justify-content-md-center p-5' />
				</div>
			</div>
		);
	}
}

export default Home;
