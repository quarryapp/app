/**
 * ProgressiveImage progressively loads a big image:
 * First it loads a small thumbnail, and at the same time it loads the full image.
 * This is a nice extra feature, which is not intended to fully work in non-real browsers. (IE, Edge, whatever)
 */

import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
    transition: opacity .5s, transform .5s;
    opacity:${props => (props.isPlaceholder && props.active && !props.fullActive) || !props.isPlaceholder && props.active ? 1 : 0};
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: ${props => props.isPlaceholder ? 2 : 1};
    background-position: center center;
    background-size: cover;
    background-image: ${props => props.backgroundImage ? props.backgroundImage : 'none'};
    transform: ${props => props.isPlaceholder && props.active && !props.fullActive ? 'scale(1.1)' : 'scale(1)'};
    
    img {
        width:100%;
        height:100%;
        object-fit: cover;
    }
`;

type ProgressiveImageProps = {
    src: string,
    srcRetina?: string,
    placeholder: string,
    blur?: number,
    fallback?: React.Element<*>,
    background?: boolean,
    style?: any
};

export default class ProgressiveImage extends React.Component {
    props: ProgressiveImageProps;

    static defaultProps = {
        blur: 10,
        //always use background if it's not supported by the browser...
        background: document.createElement('detect').style.objectFit !== ''
    };

    state = {
        fullyLoaded: false,
        placeholderLoaded: false,
        errorInLoading: false
    };

    onFullLoad() {
        if (this.refs.src.naturalWidth) {
            this.setState({
                fullyLoaded: true,
                errorInLoading: false
            });
        } else {
            this.setState({
                fullyLoaded: true,
                errorInLoading: true
            });
        }
    }

    onPlaceholderLoad() {
        this.setState({
            placeholderLoaded: true
        });
    }

    onError() {
        if (process.env.NODE_ENV !== 'production') {
            console.error(`${this.props.src} could not be loaded`); //eslint-disable-line no-console
        }
        this.setState({
            errorInLoading: true
        });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.src !== this.props.src) {
            this.setState({
                fullyLoaded: false,
                errorInLoading: false
            });
        } else {
            if (this.refs.src && this.refs.src.complete) {
                this.onFullLoad();
            } else if (this.refs.placeholder && this.refs.placeholder.complete) {
                this.onPlaceholderLoad();
            }
        }
    }

    componentDidMount() {
        //check if images are already loaded, if so, dispatch load immediately
        if (this.refs.src && this.refs.src.complete) {
            this.onFullLoad();
        } else if (this.refs.placeholder && this.refs.placeholder.complete) {
            this.onPlaceholderLoad();
        }
    }

    render() {
        const { src, srcRetina, placeholder, blur, background, fallback } = this.props;
        let backgroundImage = 'none';

        if (background) {
            backgroundImage = `url(${src})`;
            if (window.devicePixelRatio && window.devicePixelRatio >= 1.5) {
                backgroundImage = `url(${srcRetina || src})`;
            }
        }

        return (
            <div style={this.props.style}>
                { src && placeholder && !this.state.errorInLoading && (
                    <div>
                        <ImageContainer isPlaceholder active={this.state.placeholderLoaded} fullActive={this.state.fullyLoaded}>
                            <img ref="placeholder" src={placeholder} onLoad={() => this.onPlaceholderLoad()}
                                 style={{
                                     filter: `blur(${blur}px)`
                                 }}
                            />
                        </ImageContainer>
                        <ImageContainer active={this.state.fullyLoaded} backgroundImage={backgroundImage}>
                            <img style={{ opacity: background ? 0 : 1 }} ref="src" src={src}
                                 onLoad={() => this.onFullLoad()} onError={ () => this.onError() }/>
                        </ImageContainer>
                    </div>
                )}
                { fallback && (!src || !placeholder || this.state.errorInLoading) && (
                    <ImageContainer active={true}>
                        { fallback }
                    </ImageContainer>
                )}
            </div>
        );
    }
}
