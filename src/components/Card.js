// @flow

import React from 'react';
import type { ICard } from '../entities/index';
import styled from 'styled-components';
import getCardContentByType from '../services/getCardContentByType';

const RowHeight = 25;
const GridMargin = 0.5;

const ColumnStartMap = {
    'small': 'span 1',
    'medium': 'span 2',
    'large': 'span 2'
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
        height: calc(${RowHeight * 2}vh + ${GridMargin * 2}rem);
        min-width:40rem;
        min-height:370px;
    `
};

const CardContainer = styled.div`
    position: relative;
    overflow:hidden;
    ${props => SizeMap[props.size]}
    grid-column-start: ${props => ColumnStartMap[props.size]};
    grid-row-start: ${props => RowStartMap[props.size]};
    margin:${GridMargin}rem;
`;

type CardProps = {
    card: ICard,
    style?: any
};

const Card = (props: CardProps) => {
    const CardContent = getCardContentByType(props.card.type);
    
    return (
        <CardContainer size={props.card.size} style={props.style}>
            <a href={props.card.url} target="_blank">
                <CardContent card={props.card}/>
            </a>
        </CardContainer>
    );
};

export default Card;