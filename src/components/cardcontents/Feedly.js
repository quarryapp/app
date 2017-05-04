// @flow

import React from 'react';
import type { ICard } from '../../entities/index';
import Source from '../Source';
import styled from 'styled-components';
import striptags from 'striptags';
import ProgressiveImage from '../ProgressiveImage';

type FeedlyProps = {
    card: ICard
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
    
    h1 {
        font-size:1.8rem;
        font-weight:bold;
        -webkit-line-clamp: 2;
        margin-bottom:.5em;
    }
    
    p {
        margin-top:.5em;
        font-size:1.4rem;
        -webkit-line-clamp: 3;
        line-height: 1.6rem;
    }
    
    p, h1 {
        overflow:hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        line-height: 2rem;
    }
`;

const Feedly = (props: FeedlyProps) => {
    return (
        <FeedlyContainer>
            <ProgressiveImage src={props.card.data.visual.url}
                              placeholder={'edgeCacheUrl' in props.card.data.visual ? props.card.data.visual.edgeCacheUrl : null}
                              fallbackSeed={props.card._id}/>
            <FeedlyHolder>
                <FeedlyText>
                    <h1>{props.card.title}</h1>
                    <p>{striptags(props.card.data.summary.content)}</p>
                </FeedlyText>
                <Source description={`#${props.card.ranking} story on ${props.card.name}`}/>
            </FeedlyHolder>
        </FeedlyContainer>
    );
};

export default Feedly;