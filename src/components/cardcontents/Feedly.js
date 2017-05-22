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
import removeBackground from '../../services/removeBackground';
import hasha from 'hasha';

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
        line-height: ${props => props.size === 'small' ? 2.4 : 3}rem;
        font-family: Circular, sans-serif;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow:hidden;
    }
`;

const FeedlyLogo = styled.img`
    max-width:100px;
    max-height:35px;
    margin-right: 16px;
    margin-top: 16px;
    align-self: flex-end;
`;

class Feedly extends Component {
    props: FeedlyProps;
    
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
                                color={'#FFF'}>
                        <h1>{cleanHTML(this.props.card.title)}</h1>
                    </FeedlyText>
                    <div style={{flexGrow: 1}}/>
                    {this.props.card.data.logoUrl && (
                        <FeedlyLogo crossOrigin="anonymous" src={this.props.card.data.logoUrl} onLoad={(event: Event & { target: HTMLImageElement } ) => {
                            const { target }: { target: HTMLImageElement } = event;
                            if(target.src.startsWith('data:')) {
                                return;
                            }
                            const key = 'processedLogos_' + hasha(target.src).substring(10);
                            let url = localStorage.getItem(key);
                            if(!url) {
                            const url = removeBackground(event.target);
                                localStorage.setItem(key, url);
                            }
                            target.src = url;
                        }}/>
                    )}
                </FeedlyHolder>
            </FeedlyContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedly);