import LibrarySong from './LibrarySong';

const Library = ({
	songs,
	setCurrentSong,
	currentSong,
	audioRef,
	isPlaying,
	setSongs,
	libraryStatus,
}) => {
	return (
		<div className={libraryStatus ? 'Library Library-Active' : 'Library'}>
			<h2>LIBRARY</h2>
			<div className='Library-Songs'>
				{songs.map((song) => (
					<LibrarySong
						key={song.id}
						id={song.id}
						song={song}
						currentSong={currentSong}
						setCurrentSong={setCurrentSong}
						songs={songs}
						setSongs={setSongs}
						audioRef={audioRef}
						isPlaying={isPlaying}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
