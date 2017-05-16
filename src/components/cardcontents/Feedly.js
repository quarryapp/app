// @flow

import React from 'react';
import Source from '../Source';
import styled from 'styled-components';
import ProgressiveImage from '../ProgressiveImage';
import type { IFeedlyCard } from '../../entities/providers';
import cleanHTML from '../../services/cleanHTML';

type FeedlyProps = {
    card: IFeedlyCard
};

const FeedlyContainer = styled.div`
    height:100%;
    
    &:before {
        content:"";
        display:block;
        background-color: rgba(0, 0, 0, 0.50);
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
    }
`;

const FeedlyHolder = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    position:relative;
    z-index:3;
`;

const FeedlyText = styled.div`
    padding:16px;
    flex-grow:1;
    position:relative;
    color: white;
    text-align: ${props => props.direction === 'rtl' ? 'right' : 'left'};
    direction: ${props => props.direction};
    
    h1 {
        font-size:${props => props.size === 'small' ? '1.8' : '2'}rem;
        font-weight:bold;
        -webkit-line-clamp: ${props => props.hasContent ? 2 : 5};
        margin-bottom:.5em;
        line-height: ${props => props.size === 'small' ? '2' : '2.2'}rem;
    }
    
    p {
        text-align: ${props => props.contentDirection === 'rtl' ? 'right' : 'left'};
        direction: ${props => props.contentDirection};
        margin-top:.5em;
        font-size:${props => props.size === 'small' ? '1.4' : '1.6'}rem;
        -webkit-line-clamp: 3;
        line-height: ${props => props.size === 'small' ? '1.6' : '1.8'}rem;
    }
    
    p, h1 {
        overflow:hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }
`;

const Feedly = (props: FeedlyProps) => {
    const hasContent = 'content' in props.card.data;
    return (
        <FeedlyContainer>
            <ProgressiveImage src={props.card.data.visual && 'url' in props.card.data.visual ? props.card.data.visual.url : null}
                              placeholder={props.card.data.visual && 'edgeCacheUrl' in props.card.data.visual ? props.card.data.visual.edgeCacheUrl : null}
                              fallbackSeed={props.card._id}/>
            <FeedlyHolder>
                <FeedlyText size={props.card.size} hasContent={hasContent}
                            contentDirection={hasContent ? props.card.data.content.direction : 'ltr'}
                            direction={props.card.data.direction}>
                    <h1>{cleanHTML(props.card.title)}</h1>
                    {hasContent && (
                        <p>{cleanHTML(props.card.data.content.content)}</p>
                    )}
                </FeedlyText>
                <Source description={`#${props.card.ranking} Trending story on ${props.card.name}`}/>
            </FeedlyHolder>
        </FeedlyContainer>
    );
};

export default Feedly;