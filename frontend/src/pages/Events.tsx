import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import NewEventForm from '../components/form/NewEventForm';
import styles from './Events.module.css';
import api from '../services/api';
import type { Event, Sale } from '../types';

const EventCard = ({ event, sales }: { event: Event, sales: Sale[] }) => {
    const ticketsSoldCount = sales.filter(s => s.eventId === event.id && s.saleStatus === 'PAGO').length;

    const formatDateTime = (isoString: string) => new Date(isoString).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString('pt-BR');

    const typeColors: { [key: string]: { background: string, text: string } } = {
        SHOW: { background: '#E9D8FD', text: '#5A32A3' },      
        PALESTRA: { background: '#FED7E2', text: '#97266D' },   
        CURSO: { background: '#2D3748', text: '#FFFFFF' },      
        TEATRO: { background: '#E9D8B9', text: '#694A24' },     
        EVENTO: { background: '#E2E8F0', text: '#4A5568' },     
    };

    const colors = typeColors[event.type] || typeColors['EVENTO'];

    const cardStyle = {
        backgroundColor: colors.background,
        color: colors.text,
    };
    
    const statusStyle = {
        backgroundColor: colors.text,
        color: colors.background,
    }

    return (
        <Card className={styles.eventCard} style={cardStyle}>
            <div className={styles.cardHeader}>
                <h3 style={{ color: colors.text }}>{event.description}</h3>
                <span className={styles.status} style={statusStyle}>{event.type}</span>
            </div>
            <div className={styles.eventDetails}>
                <p>📅 Evento: {formatDateTime(event.date)}</p>
                <p>🛍️ Vendas: {formatDate(event.startSales)} até {formatDate(event.endSales)}</p>
                <p>👥 {ticketsSoldCount} ingressos vendidos</p>
            </div>
            <div className={styles.cardFooter}>
                <span className={styles.price} style={{ color: colors.text }}>R$ {event.price.toFixed(2)}</span>
            </div>
        </Card>
    );
};


const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [sales, setSales] = useState<Sale[]>([]);

    const fetchData = async () => {
        try {
            const [eventsData, salesData] = await Promise.all([
                 api<Event[]>('events', { method: 'GET' }),
                 api<Sale[]>('sales', { method: 'GET' })
            ]);
            setEvents(eventsData);
            setSales(salesData);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleEventSaved = () => {
        setIsModalOpen(false);
        fetchData();
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Criar Novo Evento"
            >
                <NewEventForm onEventSaved={handleEventSaved} />
            </Modal>

            <div className={styles.eventsPage}>
                <header className={styles.header}>
                    <div>
                        <h1>Eventos</h1>
                        <p>Gerencie os eventos disponíveis para venda de ingressos</p>
                    </div>
                    <button 
                        className={styles.newEventButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Novo Evento
                    </button>
                </header>
                <div className={styles.eventsGrid}>
                    {events.map((event) => (
                        <EventCard 
                            key={event.id} 
                            event={event} 
                            sales={sales} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Events;