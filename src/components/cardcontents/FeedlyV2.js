// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import ProgressiveImage from '../ProgressiveImage';
import type { IFeedlyCard } from '../../entities/providers';
import cleanHTML from '../../services/cleanHTML';
import Vibrant from 'node-vibrant';
import { connect } from 'react-redux';
import { RootState } from '../../createStore';
import { setColor } from '../../redux/colors';

type FeedlyProps = {
    card: IFeedlyCard,
    color: string,
    setColor: Function
};

const mapStateToProps = ({colors}: RootState, ownProps: FeedlyProps): RootState => ({
    color: colors[ownProps.card.data.visual && 'edgeCacheUrl' in ownProps.card.data.visual ? ownProps.card.data.visual.edgeCacheUrl : null]
});

const mapDispatchToProps = (dispatch: Function) => ({
    setColor: (url: string, color: string) => dispatch(setColor(url, color))
});

const FeedlyContainer = styled.div`
    height:100%;
`;

const FeedlyHolder = styled.div`
    display:flex;
    flex-direction:column-reverse;
    height:100%;
    position:relative;
    z-index:3;
`;

const FeedlyText = styled.div`
    padding:16px;
    position:relative;
    color: ${props => props.color};
    text-align: ${props => props.direction === 'rtl' ? 'right' : 'left'};
    direction: ${props => props.direction};
    
    h1 {
        font-size:${props => props.size === 'small' ? 2.2 : 2.8}rem;
        font-weight:bold;
        -webkit-line-clamp: 5;
        margin-bottom:.5em;
        line-height: ${props => props.size === 'small' ? 2.4 : 3}rem;
        font-family: Circular, sans-serif;
    }
`;

class Feedly extends Component {
    props: FeedlyProps;
    // state = {
    //     titleColor: '#FFF'
    // };
    
    async onFullLoad(element: HTMLImageElement) {
        if(!this.props.color) {
            const vibrant = Vibrant.from(element);
            try {
                const palette = await vibrant.getPalette();
                const swatch = palette.DarkVibrant || palette.Muted || null;
                if(swatch) {
                    this.props.setColor(element.src, swatch.getHex());
                }
            } catch(ex) {
                console.error(ex);
            }
        }
    }
    
    render() {
        const hasContent = 'content' in this.props.card.data;
        return (
            <FeedlyContainer>
                <ProgressiveImage
                    src={this.props.card.data.visual && 'edgeCacheUrl' in this.props.card.data.visual ? this.props.card.data.visual.edgeCacheUrl : null}
                    fallbackSeed={this.props.card._id}
                    onFullLoad={(...args) => this.onFullLoad(...args)}
                    crossOrigin="anonymous"
                    background={true}
                    blendWith={this.props.color}/>
                <FeedlyHolder>
                    <FeedlyText size={this.props.card.size} hasContent={hasContent}
                                contentDirection={hasContent ? this.props.card.data.content.direction : 'ltr'}
                                direction={this.props.card.data.direction}
                                color={'#FFF' /* todo */}>
                        <h1>{cleanHTML(this.props.card.title)}</h1>
                    </FeedlyText>
                </FeedlyHolder>
            </FeedlyContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedly);