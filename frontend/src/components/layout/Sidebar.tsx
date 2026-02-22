import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';


const DashboardIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const EventsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const SalesIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>;
const ReportsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6V2.5Z"></path><path d="M15.5 2v6h6V2.5Z"></path><path d="M2.5 15.5v6h6v-6Z"></path><path d="M15.5 15.5v6h6v-6Z"></path></svg>;

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div>
                <div className={styles.logo}>
                    TicketAdmin
                </div>
                <nav className={styles.nav}>
                    <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/events" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                        <EventsIcon />
                        <span>Eventos</span>
                    </NavLink>
                    <NavLink to="/sales" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                        <SalesIcon />
                        <span>Vendas</span>
                    </NavLink>
                    <NavLink to="/reports" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                        <ReportsIcon />
                        <span>Relatórios</span>
                    </NavLink>
                </nav>
            </div>

            <div className={styles.userInfo}>
                <span className={styles.userIcon}>👤</span>
                <div className={styles.userDetails}>
                    <span className={styles.userName}>Vinicius Andrade</span>
                    <span className={styles.userId}>22.1.8108</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;