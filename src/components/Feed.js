// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { FeedState } from '../redux/feed';
import { getFeed } from '../redux/feed';
import Card from './Card';
import { spring, TransitionMotion } from 'react-motion';

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

    componentDidMount() {
        this.props.getFeed(this.props.token);
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
                    <FeedContainer>
                        {styles.map((config) => {
                            return (
                                <Card key={config.key} card={config.data.doc} style={{opacity: config.style.opacity, transform: `translateY(${config.style.translateY}px)`}}/>
                            )}
                        )}
                    </FeedContainer>
                )}
            </TransitionMotion>
        );
    }
}

export default Feed;