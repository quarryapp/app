// @flow

import React from 'react';
import type { Element } from 'react';
import styled from 'styled-components';

const DefaultLogo = styled.div`
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.38);
    height: 24px;
    width: 24px;
    margin: 8px;
`;

const DefaultLogoInner = styled.span`
    display: inline-block;
    margin: 2px;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 24px;
`;

type SourceProps = {
    description: string,
    color?: string,
    logoElement?: ?Element<*>
};


const SourceContainer = styled.div`
        width: 100%;
        backdrop-filter: blur(5px);
        height: 4rem;
        background-color:${props => props.color};
        
        > span {
            color: white;
            height: 4rem;
            font-size: 16px;
            line-height: 4rem;
            position: absolute;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `;

const Source = (props: SourceProps) => {
    return (
        <SourceContainer color={props.color}>
            {props.logoElement}
            <span>{props.description}</span>
        </SourceContainer>
    );
};

Source.defaultProps = {
    logoElement: (
        <DefaultLogo>
            <DefaultLogoInner/>
        </DefaultLogo>
    ),
    color: 'rgba(143, 143, 148, 0.75)'
};

export default Source;