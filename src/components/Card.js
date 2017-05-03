// @flow

import React from 'react';
import type { ICard } from '../entities/index';
import styled from 'styled-components';
import getCardContentByType from '../services/getCardContentByType';

const RowHeight = 25;

const ColumnStartMap = {
    'small': 'span 1',
    'medium': 'span 2',
    'large': 'span 3'
};

const RowStartMap = {
    'small': 'span 1',
    'medium': 'span 1',
    'large': 'span 2'
};

const SizeMap = {
    'small': `
        height: ${RowHeight}vh;
        min-width:20rem;
        min-height:180px;
    `,
    'medium': `
        height: ${RowHeight}vh;
        min-width:40rem;
        min-height:180px;
    `,
    'large': `
        height: ${RowHeight * 2}vh;
        min-width:60rem;
        min-height:360px;
    `
};


type CardProps = {
    card: ICard
};

const Card = (props: CardProps) => {
    const CardContainer = styled.div`
        position: relative;
        ${SizeMap[props.card.size]}
		grid-column-start: ${ColumnStartMap[props.card.size]};        
		grid-row-start: ${RowStartMap[props.card.size]};
    `;
    const CardContent = getCardContentByType(props.card.type);
    
    return (
        <CardContainer>
            <CardContent card={props.card}/>
        </CardContainer>
    );
};

export default Card;