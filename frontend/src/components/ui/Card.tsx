import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; 
}

const Card: React.FC<CardProps> = ({ children, className, style }) => {
  return <div className={`${styles.card} ${className || ''}`} style={style}>{children}</div>;
};

export default Card;