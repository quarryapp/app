// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { FeedState } from '../redux/feed';
import { getFeed } from '../redux/feed';
import Card from './Card';
import { spring, TransitionMotion } from 'react-motion';

const INFINITE_SCROLL_OFFSET = 100;

const FeedContainer = styled.div`
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
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
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    }
    
    onResize = () => {
        if(this.feedContainerBounds) {
            this.feedContainerBounds = this.feedContainer.getBoundingClientRect();
        }
    }
    
    onScroll = () => {
        if((window.scrollY + window.innerHeight) > (this.feedContainerBounds.bottom - INFINITE_SCROLL_OFFSET) && !this.props.feed.isLoading) {
            this.props.getFeed(this.props.token, this.props.feed.items.page + 1);
        }
    }

    render() {
        const { docs } = this.props.feed.items;
        return (
            <TransitionMotion
                styles={docs.map(doc => ({
                    key: doc._id,
                    style: {
                        translateY: spring(0),
                        opacity: spring(1)
                    },
                    data: {
                        doc
                    }
                }))}
            willLeave={() => ({
                translateY: spring(180),
                opacity: spring(0)
            })}
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
                            {styles.map((config) => {
                                return (
                                    <Card key={config.key} card={config.data.doc} style={{opacity: config.style.opacity, transform: `translateY(${config.style.translateY}px)`}}/>
                                );}
                            )}
                        </FeedContainer>
                    </div>
                )}
            </TransitionMotion>
        );
    }
}

export default Feed;