// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { FeedState } from '../redux/feed';
import { getFeed } from '../redux/feed';
import Card from './Card';
import { spring, TransitionMotion } from 'react-motion';
import type { ICard } from '../entities';

const INFINITE_SCROLL_OFFSET = 100;

const FeedScrollContainer = styled.div`
    position: relative;
    height: calc(100vh - 4.8rem);
    overflow: auto;
`;

const FeedContainer = styled.div`
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    margin:.5rem;
`;

type FeedProps = {
    feed: FeedState,
    token: string,
    getFeed: (token: string, page: ?number) => void
};

@connect(
    ({ feed, token }) => ({ feed, token }),
    dispatch => ({
        getFeed: (token: string, page = 1) => dispatch(getFeed(token, page))
    })
)
class Feed extends Component {
    props: FeedProps;
    feedContainerBounds: ClientRect;
    feedContainer: HTMLElement;

    componentDidMount() {
        this.props.getFeed(this.props.token);
        window.addEventListener('resize', this.onResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
    
    onResize = () => {
        if(this.feedContainerBounds) {
            this.feedContainerBounds = this.feedContainer.getBoundingClientRect();
        }
    }
    
    onScroll = () => {
        if ((window.scrollY + window.innerHeight) > (this.feedContainerBounds.bottom - INFINITE_SCROLL_OFFSET) 
            && this.props.feed.items.pages >= this.props.feed.items.page 
            && !this.props.feed.isLoading) {
            this.props.getFeed(this.props.token, this.props.feed.items.page + 1);
        }
    }

    render() {
        const { docs } = this.props.feed.items;
        return (
            <FeedScrollContainer onScroll={() => this.onScroll()}>
                <TransitionMotion
                    styles={docs.map((doc: ICard, index: number) => ({
                        key: index,
                        style: {
                            translateY: spring(0),
                            opacity: spring(1)
                        },
                        data: {
                            doc
                        }
                    }))}
                willEnter={() => ({
                    translateY: 180,
                    opacity: 0
                })}>
                    {styles => (
                        <div ref={(feedContainer: HTMLElement) => {
                            this.feedContainer = feedContainer;
                            if(feedContainer) {
                                this.feedContainerBounds = feedContainer.getBoundingClientRect();
                            }
                        }}>
                            <FeedContainer>
                                {styles.map((config) =>
                                    <Card key={config.key} card={config.data.doc} style={{
                                        opacity: config.style.opacity,
                                        transform: `translateY(${config.style.translateY}px)`
                                    }}/>
                                )}
                            </FeedContainer>
                        </div>
                    )}
                </TransitionMotion>
            </FeedScrollContainer>
        );
    }
}

export default Feed;