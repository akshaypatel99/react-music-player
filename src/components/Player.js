import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'react-feather';

const Player = ({
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	songs,
	setSongs,
}) => {
	const [activeVolume, setActiveVolume] = useState(false);

	// "useEffect" style function to update song list
	const activeLibraryHandler = (nextPrev) => {
		const newSongs = songs.map((track) => {
			if (track.id === nextPrev.id) {
				return {
					...track,
					active: true,
				};
			} else {
				return {
					...track,
					active: false,
				};
			}
		});
		setSongs(newSongs);
	};
	// Event Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === 'skip-back') {
			if (currentIndex === 0) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
			} else {
				await setCurrentSong(songs[currentIndex - 1]);
				activeLibraryHandler(songs[currentIndex - 1]);
			}
		}

		if (isPlaying) audioRef.current.play();
	};

	const changeVolume = (e) => {
		let value = e.target.value;
		audioRef.current.volume = value;
		setSongInfo({ ...songInfo, volume: value });
	};

	// Add styles
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};

	return (
		<div className='Player'>
			<div className='Player-Time'>
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					className='Player-Track'
					style={{
						background: `linear-gradient(90deg, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
				>
					<input
						min='0'
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						onChange={dragHandler}
						type='range'
					/>
					<div className='Player-Track-Animate' style={trackAnim}></div>
				</div>

				<p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
			</div>
			<div className='Player-Controls'>
				<SkipBack
					className='Player-SkipBack'
					size={36}
					onClick={() => skipTrackHandler('skip-back')}
				/>
				{isPlaying ? (
					<Pause className='Player-Play' size={48} onClick={playSongHandler} />
				) : (
					<Play className='Player-Play' size={48} onClick={playSongHandler} />
				)}
				<SkipForward
					className='Player-SkipForward'
					size={36}
					onClick={() => skipTrackHandler('skip-forward')}
				/>
			</div>
			<div className='Player-Volume'>
				<Volume2 size={36} onClick={() => setActiveVolume(!activeVolume)} />
				{activeVolume && (
					<div
						className='Player-Volume-Track'
						style={{
							background: `linear-gradient(90deg, ${currentSong.color[0]}, ${currentSong.color[1]})`,
						}}
					>
						<input
							onChange={changeVolume}
							value={songInfo.volume}
							max='1'
							min='0'
							step='0.01'
							type='range'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Player;
