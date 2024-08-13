import MainScreen from "@/components/MainScreen/MainScreen";
import Layout from "@/components/Layout/Layout";

import styles from "./page.module.css";

const Home = () => (
  <main className={styles.main}>
    <Layout>
      <MainScreen />
    </Layout>
  </main>
);

export default Home;
