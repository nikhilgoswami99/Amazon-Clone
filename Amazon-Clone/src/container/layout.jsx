import styles from './layout.module.css'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer';

import { Outlet } from 'react-router-dom';


function Layout()
{
    return <>
    <Navbar></Navbar>
    <section className={styles.dynamic_section}>
    <Outlet></Outlet>
    </section>
    <Footer></Footer>
    </>
}


export default Layout;