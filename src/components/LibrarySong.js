const LibrarySong = ({
	song,
	setCurrentSong,
	songs,
	currentSong,
	audioRef,
	isPlaying,
	active,
	setSongs,
}) => {
	const songSelectHandler = async () => {
		await setCurrentSong(song);
		// Add active state
		const newSongs = songs.map((track) => {
			if (track.id === song.id) {
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

		if (isPlaying) audioRef.current.play();
	};

	return (
		<div
			className={
				song.active ? 'Library-Song Library-Song-Selected' : 'Library-Song'
			}
			onClick={songSelectHandler}
		>
			<img src={song.cover} alt={song.name} />
			<div className='Library-Song-Desc'>
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
