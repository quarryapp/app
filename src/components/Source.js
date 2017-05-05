// @flow

import React from 'react';
import type { Element } from 'react';
import styled from 'styled-components';

const DefaultLogo = styled.span`
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.38);
    height: 24px;
    width: 24px;
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
    height: 4rem;
    background-color:${props => props.color};
    display: flex;
`;

const SourceText = styled.span`
    color: white;
    height: 4rem;
    font-size: 1.6rem;
    line-height: 4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin-right: 1.6rem;
`;

const SourceIcon = styled.span`
    display: inline-block;
    margin: 0.8rem;
    display: flex;
    align-items: center;
`;

const Source = (props: SourceProps) => (
    <SourceContainer color={props.color}>
        <SourceIcon>
            {props.logoElement}
        </SourceIcon>
        <SourceText>{props.description}</SourceText>
    </SourceContainer>
);

Source.defaultProps = {
    logoElement: (
        <DefaultLogo>
            <DefaultLogoInner/>
        </DefaultLogo>
    ),
    color: 'rgba(143, 143, 148, 0.75)'
};

export default Source;