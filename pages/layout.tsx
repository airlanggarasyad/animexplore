import styles from '../styles/Home.module.css';

import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Layout = ({ children }) => {
    return (
        <main className={styles.main}>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
};

Layout.displayName= 'Layout';
export default Layout;