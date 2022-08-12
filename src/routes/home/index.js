import { useEffect, useState } from "preact/hooks";
import { Link } from "preact-router";
import * as styles from "./Home.module.css";
import { usePrerenderData } from "@preact/prerender-data-provider";

const Home = (props) => {
  const [data, isLoading] = usePrerenderData(props);

  useEffect(() => {
    if (
      window !== undefined &&
      window.location.href.includes("#invite_token")
    ) {
      const { href } = window.location;
      window.location.href = `${href.substring(
        0,
        href.indexOf("#")
      )}admin${href.substring(href.indexOf("#"))}`;
    }
  }, []);
  return <div>{getBlogsListing(data, isLoading)}</div>;
};

function getBlogsListing(data, isLoading) {
  const [feature, setFeature] = useState(data?.data?.edges[0]);
  if (isLoading) {
    return "loading";
  }
  if (data && data.data) {
    const { data: blogs } = data;
    return (
      <>
        <div
          className={styles.featured}
          style={`background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("${feature.details.cover}") no-repeat center fixed;`}
        >
          <div className={styles.featured_image}>
            <div className={styles.featured_blog}>
              <div>
                <h1 className={styles.blogtitle}>
                  {feature.details.title}
                  <Link href={`/blog/${feature.id}`}>
                    <span>READ</span>
                  </Link>
                </h1>
              </div>
              <div className={styles.dot_container}>
                {blogs.edges.map((blog) => (
                  <span
                    key={`${blog.id}`}
                    onClick={() => setFeature(blog)}
                    className={`${styles.dot} ${
                      blog.id === feature.id ? styles.active : null
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
