import { Layout, Search } from "@/app/components";
import "./homepage.css";

export default function Homepage() {
  return (
    <Layout>
      <div className="homepage-images">
        <div className="homepage-hero">
          <h1 className="homepage-hero-title">
            Connecting talent with opportunity
          </h1>
        </div>
        <Search source="home" />
      </div>
    </Layout>
  );
}
