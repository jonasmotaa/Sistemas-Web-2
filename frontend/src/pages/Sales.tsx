import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import NewSaleForm from '../components/form/NewSaleForm';
import styles from './Sales.module.css';
import api from '../services/api';
import type { Sale, User, Event } from '../types';


type SaleStatus = 'EM_ABERTO' | 'PAGO' | 'CANCELADO' | 'ESTORNADO';

const getStatusOrder = (status: string) => {
    switch (status) {
        case 'PAGO':
            return 1; // Confirmado
        case 'EM_ABERTO':
            return 2; // Pendente
        case 'CANCELADO':
            return 3; // Cancelado
        case 'ESTORNADO':
            return 4; // Estornado
        default:
            return 5; // Outros
    }
};


const StatusBadge = ({ status } : { status: string }) => {
    const statusKey = status.toLowerCase().replace('_', '');
    return <span className={`${styles.statusBadge} ${styles[statusKey]}`}>{status.replace('_', ' ')}</span>;
}

const SaleItem = ({ sale, users, events, onStatusChange } : { sale: Sale, users: User[], events: Event[], onStatusChange: (saleId: string, newStatus: SaleStatus) => void }) => {
    const user = users.find(u => u.id === sale.userId);
    const event = events.find(e => e.id === sale.eventId);

    if (!user || !event) {
        return <Card className={styles.saleItem}>Carregando detalhes da venda...</Card>;
    }

    const statusMap: { label: string, key: SaleStatus, style: string }[] = [
        { label: 'Pendente', key: 'EM_ABERTO', style: styles.pendente },
        { label: 'Confirmado', key: 'PAGO', style: styles.pago },
        { label: 'Cancelado', key: 'CANCELADO', style: styles.cancelado },
        { label: 'Estornado', key: 'ESTORNADO', style: styles.estornado },
    ];

    return (
        <Card className={styles.saleItem}>
            <div className={styles.saleInfo}>
                <div className={styles.eventTitle}>
                    <h4>{event.description}</h4>
                    <StatusBadge status={sale.saleStatus} />
                </div>
                <div className={styles.saleDetails}>
                    <span>👤 {user.name} ({user.email})</span>
                    <span>📅 {new Date(sale.saleDate).toLocaleString()}</span>
                    <span>🎟️ 1 ingresso</span>
                    <span className={styles.amount}>R$ {event.price.toFixed(2)}</span>
                </div>
            </div>
            <div className={styles.actions}>
                 {statusMap.map(({ label, key, style }) => (
                    <button 
                        key={key}
                        onClick={() => onStatusChange(sale.id, key)}
                        className={`${styles.actionButton} ${style} ${sale.saleStatus === key ? styles.active : ''}`}
                    >
                        {label}
                    </button>
                 ))}
            </div>
        </Card>
    );
};

const Sales = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allSales, setAllSales] = useState<Sale[]>([]);
    const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [statusFilter, setStatusFilter] = useState('Todos');

    const fetchData = async () => {
        try {
            const [salesData, usersData, eventsData] = await Promise.all([
                api<Sale[]>('sales', { method: 'GET' }),
                api<User[]>('users', { method: 'GET' }),
                api<Event[]>('events', { method: 'GET' })
            ]);

            const sortedSales = salesData.sort((a, b) => getStatusOrder(a.saleStatus) - getStatusOrder(b.saleStatus));

            setAllSales(sortedSales);
        
            if (statusFilter === 'Todos') {
                setFilteredSales(sortedSales);
            } else {
                const filterKey = statusFilter.toUpperCase().replace(' ', '_');
                setFilteredSales(sortedSales.filter(sale => sale.saleStatus === filterKey));
            }
            setUsers(usersData);
            setEvents(eventsData);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (statusFilter === 'Todos') {
            setFilteredSales(allSales);
        } else {
            const filterKey = statusFilter.toUpperCase().replace(' ', '_');
            setFilteredSales(allSales.filter(sale => sale.saleStatus === filterKey));
        }
    }, [statusFilter, allSales]);

    const handleStatusChange = async (saleId: string, newStatus: SaleStatus) => {
        try {
            await api('updateSaleStatus', {
                method: 'PUT',
                body: JSON.stringify({ saleId, newStatus }),
            });
            fetchData();
        } catch (error) {
            console.error("Falha ao atualizar o status da venda:", error);
            alert("Não foi possível atualizar o status. Tente novamente.");
        }
    };

    const handleSaleCreated = () => {
        setIsModalOpen(false);
        fetchData();
    };


    const saleStatusOptions = ["Todos", "Pago", "Em Aberto", "Cancelado", "Estornado"];

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registrar Nova Venda"
            >
                <NewSaleForm users={users} events={events} onSaleCreated={handleSaleCreated} />
            </Modal>

            <div className={styles.salesPage}>
                <header className={styles.header}>
                    <div>
                        <h1>Vendas de Ingressos</h1>
                        <p>Gerencie as vendas e altere o status dos ingressos</p>
                    </div>
                    <button 
                        className={styles.newSaleButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Nova Venda
                    </button>
                </header>

                <div className={styles.filters}>
                    <input type="text" placeholder="🔍 Buscar por usuário ou evento..." className={styles.searchInput} />
                    <select className={styles.statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        {saleStatusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.salesList}>
                    {filteredSales.map((sale) => (
                        <SaleItem key={sale.id} sale={sale} users={users} events={events} onStatusChange={handleStatusChange} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sales;