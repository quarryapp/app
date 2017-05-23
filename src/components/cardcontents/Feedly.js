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
import { setLogo } from '../../redux/logos';

type FeedlyProps = {
    card: IFeedlyCard,
    color: string,
    logo: string,
    setColor: Function,
    setLogo: Function,
};

const mapStateToProps = ({ colors, logos }: RootState, ownProps: FeedlyProps): RootState => ({
    color: colors[ownProps.card.data.visual && 'edgeCacheUrl' in ownProps.card.data.visual ? ownProps.card.data.visual.edgeCacheUrl : null],
    logo: ownProps.card.data.logoUrl in logos ? logos[ownProps.card.data.logoUrl] : ownProps.card.data.logoUrl   
});

const mapDispatchToProps = (dispatch: Function) => ({
    setColor: (url: string, color: string) => dispatch(setColor(url, color)),
    setLogo: (logoUrl: string, dataUrl: string) => dispatch(setLogo(logoUrl, dataUrl))
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
    transition: opacity .25s;
    opacity: 0;
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
                        <FeedlyLogo alt={this.props.card.name} crossOrigin="anonymous" src={this.props.logo} onLoad={(event: Event & { target: HTMLImageElement } ) => {
                            const { target }: { target: HTMLImageElement } = event;
                            if(target.src.startsWith('data:')) {
                                target.style.opacity = '1';
                                return;
                            }
                            
                            window.requestIdleCallback(() => {
                                const url = removeBackground(target);
                                this.props.setLogo(target.src, url);
                                target.src = url;
                                target.style.opacity = '1';
                            });
                        }}/>
                    )}
                </FeedlyHolder>
            </FeedlyContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedly);