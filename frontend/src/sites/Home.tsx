import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Style from 'style/home.module.sass';
import axios from 'axios';
import { Endpoints } from 'scripts/constants';

import Header from 'components/Header';
import ContentBox from 'components/ContentBox';
import VideoElement from 'components/VideoElement';
import { Video as VideoType } from 'scripts/types';

interface State {
	videos: VideoType[]
}

class Home extends Component<{}, State> {

	constructor(props: {}) {
		super(props);
		this.state = {
			videos: []
		};
	}

	componentDidMount() {
		this.fetchVideos();
	}

	async fetchVideos() {
		axios.get(Endpoints.video)
			.then(res => {
				this.setState({ videos: res.data });
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className={Style.Home}>
				<Header />
				<ContentBox
					left={
						<>All Movies</>
					}
					content={
						<div className={Style.AllVideos}>
							{this.state.videos.map((video) =>
								<Link key={video.id} to={"/video/" + video.id}>
									<VideoElement width={160} height={270} name={video.name} thumbnailURL={Endpoints.thumbnail + "/" + video.id} />
								</Link>)}
						</div>
					}
				/>
			</div>
		);
	}
}

export default Home;