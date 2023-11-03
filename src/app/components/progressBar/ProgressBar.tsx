import React from 'react';
import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className={styles.bar}>
            <div className={styles.fill} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default ProgressBar;
