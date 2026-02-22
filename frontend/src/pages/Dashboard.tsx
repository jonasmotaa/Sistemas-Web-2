import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import styles from './Dashboard.module.css';
import api from '../services/api';
import type { Sale, Event } from '../types';

const StatCard = ({ title, value, icon, iconBgColor }: { title: string, value: string, icon: string, iconBgColor: string }) => (
    <Card className={styles.statCard}>
        <div className={styles.statIcon} style={{ backgroundColor: iconBgColor }}>{icon}</div>
        <div className={styles.statInfo}>
            <span className={styles.statTitle}>{title}</span>
            <span className={styles.statValue}>{value}</span>
        </div>
    </Card>
);

const Dashboard = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    
    const [selectedSaleMonth, setSelectedSaleMonth] = useState<number>(new Date().getMonth());
    const [selectedEventMonth, setSelectedEventMonth] = useState<number>(new Date().getMonth());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesData, eventsData] = await Promise.all([
                    api<Sale[]>('sales', { method: 'GET' }),
                    api<Event[]>('events', { method: 'GET' })
                ]);
                setSales(salesData);
                setEvents(eventsData);
            } catch (error) {
                console.error("Erro ao carregar dados do dashboard:", error);
            }
        };
        fetchData();
    }, []);


    const totalVendas = sales
        .filter(s => s.saleStatus === 'PAGO')
        .reduce((acc, sale) => {
            const event = events.find(e => e.id === sale.eventId);
            return acc + (event?.price || 0);
        }, 0);

    const ingressosVendidos = sales.filter(s => s.saleStatus === 'PAGO').length;
    const filteredSales = sales.filter(sale => new Date(sale.saleDate).getMonth() === selectedSaleMonth);
    const filteredEvents = events.filter(event => new Date(event.date).getMonth() === selectedEventMonth);
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Dashboard</h1>
                <p>Visão geral do sistema de vendas de ingressos</p>
            </header>

            <div className={styles.statsGrid}>
                 <StatCard title="Total de Vendas" value={`R$ ${totalVendas.toFixed(2)}`} icon="💲" iconBgColor="#c6f6d5" />
                <StatCard title="Eventos Ativos" value={events.length.toString()} icon="📅" iconBgColor="#bee3f8" />
                <StatCard title="Ingressos Vendidos" value={ingressosVendidos.toString()} icon="🎟️" iconBgColor="#fed7d7" />
            </div>

            <div className={styles.columns}>
                <Card className={styles.listCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Vendas Recentes</h2>
                        <select className={styles.monthFilter} value={selectedSaleMonth} onChange={e => setSelectedSaleMonth(Number(e.target.value))}>
                           {meses.map((mes, index) => (
                               <option key={index} value={index}>{mes}</option>
                           ))}
                        </select>
                    </div>
                    <ul className={styles.list}>
                        {filteredSales.length > 0 ? filteredSales.map(sale => {
                             const event = events.find(e => e.id === sale.eventId);
                             const statusKey = (sale.saleStatus || '').toLowerCase().replace('_','');
                             return (
                                <li key={sale.id} className={styles.listItem}>
                                    <span>{event?.description || 'Evento desconhecido'}</span>
                                    <div className={styles.saleDetails}>
                                        <span className={styles.value}>R$ {event?.price.toFixed(2) || '0.00'}</span>
                                        <span className={`${styles.status} ${styles[statusKey]}`}>{sale.saleStatus.replace('_', ' ')}</span>
                                    </div>
                                </li>
                             )
                        }) : <li>Nenhuma venda neste mês.</li>}
                    </ul>
                </Card>
                <Card className={styles.listCard}>
                     <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Próximos Eventos</h2>
                        <select className={styles.monthFilter} value={selectedEventMonth} onChange={e => setSelectedEventMonth(Number(e.target.value))}>
                           {meses.map((mes, index) => (
                               <option key={index} value={index}>{mes}</option>
                           ))}
                        </select>
                    </div>
                    <ul className={styles.list}>
                        {filteredEvents.length > 0 ? filteredEvents.map(event => {
                             const vendidos = sales.filter(s => s.eventId === event.id && s.saleStatus === 'PAGO').length;
                             return (
                                <li key={event.id} className={styles.eventItem}>
                                    <div className={styles.eventInfo}>
                                        <span>{event.description} <small>{new Date(event.date).toLocaleDateString()}</small></span>
                                        <small>{vendidos} ingressos vendidos</small>
                                    </div>
                                </li>
                             )
                        }) : <li>Nenhum evento neste mês.</li>}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;