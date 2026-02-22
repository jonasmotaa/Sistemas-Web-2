import React, { useState } from 'react';
import api from '../../services/api';
import styles from './Form.module.css';

interface NewEventFormProps {
  onEventSaved: () => void;
}

const NewEventForm: React.FC<NewEventFormProps> = ({ onEventSaved }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const combineDateTime = (date: string, time: string) => `${date}T${time}:00`;

    const eventData = {
      description: formData.get('description') as string,
      type: formData.get('type') as string,
      price: parseFloat(formData.get('price') as string),
      date: combineDateTime(formData.get('eventDate') as string, formData.get('eventTime') as string),
      startSales: combineDateTime(formData.get('startSalesDate') as string, formData.get('startSalesTime') as string),
      endSales: combineDateTime(formData.get('endSalesDate') as string, formData.get('endSalesTime') as string),
    };

    try {
      await api('events', {
        method: 'POST',
        body: JSON.stringify(eventData),
      });
      alert('Evento criado com sucesso!');
      onEventSaved();
    } catch (err) {
      setError('Falha ao criar o evento. Verifique os dados e tente novamente.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
       {error && <p className={styles.error}>{error}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="description">Descrição do Evento</label>
        <input name="description" type="text" id="description" required placeholder="Ex: Show da Virada" />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="type">Tipo de Evento</label>
          <select name="type" id="type" required defaultValue="SHOW">
              <option value="SHOW">Show</option>
              <option value="TEATRO">Teatro</option>
              <option value="PALESTRA">Palestra</option>
              <option value="CURSO">Curso</option>
          </select>
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="price">Preço (R$)</label>
            <input name="price" type="number" id="price" step="0.01" required placeholder="Ex: 150.00" />
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label>Data e Hora do Evento</label>
        <div className={styles.formRow}>
            <input name="eventDate" type="date" id="eventDate" required aria-label="Data do Evento"/>
            <input name="eventTime" type="time" id="eventTime" required aria-label="Hora do Evento"/>
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label>Início das Vendas</label>
        <div className={styles.formRow}>
            <input name="startSalesDate" type="date" id="startSalesDate" required aria-label="Data de início das vendas"/>
            <input name="startSalesTime" type="time" id="startSalesTime" required aria-label="Hora de início das vendas"/>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Fim das Vendas</label>
        <div className={styles.formRow}>
            <input name="endSalesDate" type="date" id="endSalesDate" required aria-label="Data de fim das vendas"/>
            <input name="endSalesTime" type="time" id="endSalesTime" required aria-label="Hora de fim das vendas"/>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={onEventSaved}>
          Cancelar
        </button>
        <button type="submit" className={styles.button}>
          Salvar Evento
        </button>
      </div>
    </form>
  );
};

export default NewEventForm;