/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router';
import styles from './home.css';
import { usePrerenderData } from '@preact/prerender-data-provider';

const Home = (props) => {
	const [data, isLoading] = usePrerenderData(props);

	useEffect(() => {
		if (
			window !== undefined &&
      window.location.href.includes('#invite_token')
		) {
			const { href } = window.location;
			window.location.href = `${href.substring(
				0,
				href.indexOf('#')
			)}admin${href.substring(href.indexOf('#'))}`;
		}
	}, []);
	return <div>{getBlogsListing(data, isLoading)}</div>;
};

function getBlogsListing(data, isLoading) {
	const [feature, setFeature] = useState(data?.data?.edges[0]);
	if (isLoading) {
		return 'loading';
	}
	if (data && data.data) {
		const { data: blogs } = data;
		return (
      <>'     '<div
      	class={styles.featured}
      	style={`background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${feature.details.cover}') no-repeat center fixed;`}
      >
        	<div class={styles.featured_image}>
        		<div class={styles.featured_blog}>
        			<div>
        				<h1 class={styles.blogtitle}>
        					{feature.details.title}
        					<Link href={`/blog/${feature.id}`}>
        						<span>READ</span>
        					</Link>
        				</h1>
        			</div>
        			<div class={styles.dot_container}>
        				{blogs.edges.map((blog) => (
        					<span
      						key={`${blog.id}`}
      						onClick={() => setFeature(blog)}
      						class={`${styles.dot} ${
        							blog.id === feature.id ? styles.active : null
        						}`}
        					/>
        				))}
        			</div>
        		</div>
        	</div>
      </div>'     '</>
		);
	}
}

export default Home;
