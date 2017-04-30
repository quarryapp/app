// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { FeedState } from '../redux/feed';
import { getFeed } from '../redux/feed';

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
        setTimeout(() => {
            this.props.getFeed(this.props.token);
        });
    }

    render() {
        return (
            <FeedContainer>
                {!this.props.feed.error && !this.props.feed.isLoading && this.props.feed.items.docs.map(doc => 
                    <div>
                        <h1>{doc.title} ({doc.type})</h1>
                    </div>
                )}
            </FeedContainer>
        );
    }
}

export default Feed;