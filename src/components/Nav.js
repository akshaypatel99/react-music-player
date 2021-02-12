import { Music } from 'react-feather';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
	return (
		<nav className='Nav'>
			<h1>chillhop</h1>
			<button onClick={() => setLibraryStatus(!libraryStatus)}>
				<p>LIBRARY</p>
				<Music />
			</button>
		</nav>
	);
};

export default Nav;
