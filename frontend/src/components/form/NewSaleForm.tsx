import React, { useState } from 'react';
import api from '../../services/api';
import type { User, Event } from '../../types';
import styles from './Form.module.css';

interface NewSaleFormProps {
    users: User[];
    events: Event[];
    onSaleCreated: () => void;
}

const NewSaleForm: React.FC<NewSaleFormProps> = ({ users, events, onSaleCreated }) => {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const saleData = {
            userId: formData.get('userId') as string,
            eventId: formData.get('eventId') as string,
            saleStatus: formData.get('saleStatus') as string,
        };

        if (!saleData.userId || !saleData.eventId) {
            setError("Por favor, selecione um usuário e um evento.");
            return;
        }

        try {
            await api('sales', {
                method: 'POST',
                body: JSON.stringify(saleData)
            });
            alert('Venda registrada com sucesso!');
            onSaleCreated();
        } catch (err) {
            setError('Falha ao registrar a venda. Tente novamente.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.formGroup}>
                <label htmlFor="eventId">Selecione o Evento</label>
                <select name="eventId" id="eventId" required defaultValue="">
                    <option value="" disabled>Escolha um evento...</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>{event.description}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="userId">Selecione o Usuário</label>
                <select name="userId" id="userId" required defaultValue="">
                    <option value="" disabled>Escolha um usuário...</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="saleStatus">Status da Venda</label>
                <select name="saleStatus" id="saleStatus" required defaultValue="PAGO">
                    <option value="EM_ABERTO">Em aberto</option>
                    <option value="PAGO">Pago</option>
                    <option value="CANCELADO">Cancelado</option>
                    <option value="ESTORNADO">Estornado</option>
                </select>
            </div>
            
            <div className={styles.formActions}>
                <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={onSaleCreated}>
                    Cancelar
                </button>
                <button type="submit" className={styles.button}>
                    Registrar Venda
                </button>
            </div>
        </form>
    );
};

export default NewSaleForm;