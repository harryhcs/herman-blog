import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<Link href="/">
			<h2>Herman Stander</h2>
		</Link>
		<nav>
			<Link activeClassName={style.active} href="/blogs">
        Blog
			</Link>
		</nav>
	</header>
);

export default Header;
