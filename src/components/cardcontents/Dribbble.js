// @flow

import React from 'react';
import Source from '../Source';
import styled from 'styled-components';
import type { IDribbbleCard } from '../../entities/providers';
import ProgressiveImage from '../ProgressiveImage';

type DribbbleProps = {
    card: IDribbbleCard
};

const DribbbleContainer = styled.div`
    height:100%;
`;

const DribbbleHolder = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    position:relative;
    z-index:4;
`;

const Dribbble = (props: DribbbleProps) => (
    <DribbbleContainer>
        <DribbbleHolder>
            <Source logoElement={dribbbleLogo} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3 }}
                    color="rgba(239, 18, 98, 0.75)" description={props.card.title}/>
            <ProgressiveImage src={props.card.data.images.hidpi ? props.card.data.images.hidpi : props.card.data.images.normal} placeholder={props.card.data.images.teaser} fallbackSeed={props.card._id}/>
        </DribbbleHolder>
    </DribbbleContainer>
);

const dribbbleLogo = (
    <svg width="18px" height="18px" viewBox="0 0 256 256">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Artboard" fillRule="nonzero" fill="#FFFFFF">
                <g id="dribbble-icon">
                    <path d="M128,255.7 C57.4,255.7 0,198.4 0,127.9 C0,57.3 57.4,0 128,0 C198.6,0 256,57.3 256,127.8 C256,198.3 198.6,255.7 128,255.7 L128,255.7 L128,255.7 Z M235.9,145.3 C232.2,144.1 202.1,135.2 167.8,140.6 C182.1,179.8 187.9,211.8 189,218.4 C213.6,201.9 231.1,175.7 235.9,145.3 L235.9,145.3 L235.9,145.3 Z M170.7,228.5 C169.1,218.9 162.7,185.5 147.4,145.7 C147.2,145.8 146.9,145.9 146.7,145.9 C85,167.4 62.9,210.1 60.9,214.1 C79.4,228.5 102.7,237.1 128,237.1 C143.1,237.2 157.6,234.1 170.7,228.5 L170.7,228.5 L170.7,228.5 Z M46.8,201 C49.3,196.8 79.3,147.2 135.7,128.9 C137.1,128.4 138.6,128 140,127.6 C137.3,121.4 134.3,115.2 131.1,109.1 C76.5,125.4 23.5,124.7 18.7,124.6 C18.7,125.7 18.6,126.8 18.6,127.9 C18.7,156 29.3,181.6 46.8,201 L46.8,201 L46.8,201 Z M21,105.6 C25.9,105.7 70.9,105.9 122.1,92.3 C104,60.1 84.4,33.1 81.6,29.2 C50.9,43.6 28.1,71.8 21,105.6 L21,105.6 L21,105.6 Z M102.4,21.8 C105.4,25.8 125.3,52.8 143.2,85.7 C182.1,71.1 198.5,49.1 200.5,46.3 C181.2,29.2 155.8,18.8 128,18.8 C119.2,18.8 110.6,19.9 102.4,21.8 L102.4,21.8 L102.4,21.8 Z M212.6,58.9 C210.3,62 192,85.5 151.6,102 C154.1,107.2 156.6,112.5 158.9,117.8 C159.7,119.7 160.5,121.6 161.3,123.4 C197.7,118.8 233.8,126.2 237.4,126.9 C237.1,101.2 227.9,77.5 212.6,58.9 L212.6,58.9 L212.6,58.9 Z"/>
                </g>
            </g>
        </g>
    </svg>
);

export default Dribbble;