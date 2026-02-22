import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import styles from './Reports.module.css';
import api from '../services/api';
import type { Sale, Event, User } from '../types';

const ReportStatCard = ({ title, value, icon, iconBgColor }: { title: string, value: string, icon: string, iconBgColor: string }) => (
    <Card className={styles.statCard}>
        <div className={styles.statIcon} style={{ backgroundColor: iconBgColor }}>{icon}</div>
        <div className={styles.statInfo}>
            <span className={styles.statTitle}>{title}</span>
            <span className={styles.statValue}>{value}</span>
        </div>
    </Card>
);

const Reports = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [users, setUsers] = useState<User[]>([]);

     useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesData, eventsData, usersData] = await Promise.all([
                    api<Sale[]>('sales', { method: 'GET' }),
                    api<Event[]>('events', { method: 'GET' }),
                    api<User[]>('users', { method: 'GET' }),
                ]);
                setSales(salesData);
                setEvents(eventsData);
                setUsers(usersData);
            } catch (error) {
                console.error("Erro ao carregar dados dos relatórios:", error);
            }
        };
        fetchData();
    }, []);

    const handleExport = () => {
        const headers = ["ID Venda", "Data", "Evento", "Cliente", "Email Cliente", "Valor (R$)", "Status"];
        
        const rows = sales.map(sale => {
            const event = events.find(e => e.id === sale.eventId);
            const user = users.find(u => u.id === sale.userId);

            return [
                sale.id,
                new Date(sale.saleDate).toLocaleString(),
                event?.description || 'N/A',
                user?.name || 'N/A',
                user?.email || 'N/A',
                event?.price.toFixed(2) || '0.00',
                sale.saleStatus
            ].join(',');
        });

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "relatorio_vendas.csv");
        document.body.appendChild(link);
        
        link.click();
        document.body.removeChild(link);
    };

    const receitaTotal = sales
        .filter(s => s.saleStatus === 'PAGO')
        .reduce((acc, sale) => {
            const event = events.find(e => e.id === sale.eventId);
            return acc + (event?.price || 0);
        }, 0);

    const ingressosVendidos = sales.filter(s => s.saleStatus === 'PAGO').length;
    const clientesUnicos = new Set(sales.filter(s => s.saleStatus === 'PAGO').map(s => s.userId)).size;
    
    
    const vendasConfirmadas = sales.filter(s => s.saleStatus === 'PAGO').length;
    const vendasPendentes = sales.filter(s => s.saleStatus === 'EM_ABERTO').length;
    const vendasCanceladas = sales.filter(s => s.saleStatus === 'CANCELADO').length;
    const vendasEstornadas = sales.filter(s => s.saleStatus === 'ESTORNADO').length; // <<-- CONTAGEM ADICIONADA

    const performanceEventos = events.map(event => {
        const vendasDoEvento = sales.filter(s => s.eventId === event.id && s.saleStatus === 'PAGO');
        return {
            name: event.description,
            vendidos: vendasDoEvento.length,
            receita: vendasDoEvento.length * event.price,
        }
    }).sort((a, b) => b.receita - a.receita).slice(0, 3);

    return (
        <div className={styles.reportsPage}>
            <header className={styles.header}>
                <div>
                    <h1>Relatórios</h1>
                    <p>Análise de vendas e performance dos eventos</p>
                </div>
                <button className={styles.exportButton} onClick={handleExport}>
                    Exportar Relatório
                </button>
            </header>
            
            <div className={styles.statsGrid}>
                <ReportStatCard title="Receita Total" value={`R$ ${receitaTotal.toFixed(2)}`} icon="💲" iconBgColor="#c6f6d5" />
                <ReportStatCard title="Total de Eventos" value={events.length.toString()} icon="📅" iconBgColor="#bee3f8" />
                <ReportStatCard title="Ingressos Vendidos" value={ingressosVendidos.toString()} icon="🎟️" iconBgColor="#fed7d7" />
                <ReportStatCard title="Clientes Únicos" value={clientesUnicos.toString()} icon="👥" iconBgColor="#feebc8" />
            </div>

            <Card>
                <h2 className={styles.cardTitle}>Eventos com Melhor Performance</h2>
                <ul className={styles.performanceList}>
                    {performanceEventos.map(event => (
                         <li key={event.name} className={styles.performanceItem}>
                            <div className={styles.eventInfo}>
                                <span>{event.name}</span>
                                <small>{event.vendidos} ingressos - R$ {event.receita.toFixed(2)}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card>
                <h2 className={styles.cardTitle}>Status das Vendas</h2>
                <div className={styles.salesStatusGrid}>
                    <div className={styles.statusItem}>
                        <span className={styles.statusValue}>{vendasConfirmadas}</span>
                        <span>Vendas Confirmadas</span>
                        <div className={`${styles.statusLine} ${styles.confirmed}`}></div>
                    </div>
                    <div className={styles.statusItem}>
                        <span className={styles.statusValue}>{vendasPendentes}</span>
                        <span>Vendas Pendentes</span>
                         <div className={`${styles.statusLine} ${styles.pending}`}></div>
                    </div>
                    <div className={styles.statusItem}>
                        <span className={styles.statusValue}>{vendasCanceladas}</span>
                        <span>Vendas Canceladas</span>
                         <div className={`${styles.statusLine} ${styles.cancelled}`}></div>
                    </div>
                    {/* <<-- BLOCO ADICIONADO -->> */}
                    <div className={styles.statusItem}>
                        <span className={styles.statusValue}>{vendasEstornadas}</span>
                        <span>Vendas Estornadas</span>
                         <div className={`${styles.statusLine} ${styles.estornado}`}></div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Reports;