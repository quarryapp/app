// @flow

import Button from 'material-ui/Button';
import React from 'react';
import ArrowBack from 'react-icons/lib/md/arrow-back';
import ArrowForward from 'react-icons/lib/md/arrow-forward';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import type { OnboardingState } from '../redux/onboarding';
import { decreaseOnboardingStep, increaseOnboardingStep } from '../redux/onboarding';
import SlideIndicator from './SlideIndicator';

type OnboardingProps = OnboardingState & {
    increase: () => void,
    decrease: () => void,
};

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(33, 33, 33, 0.38);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

const Container = styled.div`
    display: flex;
    max-width: 100vw;
    align-items: center;
    
    button {
        min-width: 56px;
        margin: 0 1rem;
    }
`;

const Card = styled.div`
    background: #FFFFFF;
    box-shadow: 0 12px 12px rgba(0, 0, 0, 0.237602), 0 0 12px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.24), 0 0 6px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    margin: 2.4rem;
    overflow: hidden;
    margin-bottom: 4.4rem;
    
    p { 
        line-height: 2.6rem;
        font-size: 1.6rem;
        color: rgba(0, 0, 0, 0.54);
        font-weight: normal;
        margin-bottom: 4rem;
    }
    
    h1 {
        font-weight: 500;
        line-height: 3.2rem;
        font-size: 2.4rem;
        color: rgba(0, 0, 0, 0.87);
        margin: .8rem;
    }
`;

const CardContent = styled.div`
    padding: 0 7rem 3rem;
    text-align: center;
    overflow-y: auto;
    max-height: calc(100vh - 6rem);
`;

const IllustrationPlaceholder = styled.div`
    background-color: rgba(33, 33, 33, 0.12);
    width: 58rem;
    height: 40rem;
    margin: 0 auto 3rem;
`;

const Onboarding = (props: OnboardingProps) => (
    !props.complete ? (
        <Overlay>
            <Container>
                <Button color="primary" fab disabled={props.step === 0} onClick={() => props.decrease()}>
                    <ArrowBack width={16} height={16}/>
                </Button>
                <Card>
                    <SwipeableViews index={props.step}>
                        <CardContent>
                            <IllustrationPlaceholder/>
                            <h1>The app that does all</h1>
                            <p>Get all your daily sources in one place</p>
                            <Button color="accent" raised onClick={() => props.increase()}>
                                Get started
                            </Button>
                        </CardContent>
                        <CardContent>
                            <h1>Swag</h1>
                        </CardContent>
                    </SwipeableViews>
                </Card>
                <Button color="primary" fab disabled={props.step === 3} onClick={() => props.increase()}>
                    <ArrowForward width={16} height={16}/>
                </Button>
            </Container>
            <SlideIndicator items={4} activeIndex={props.step} />
        </Overlay>
    ) : null
);

const mapDispatchToProps = dispatch => ({
    increase: () => dispatch(increaseOnboardingStep()),
    decrease: () => dispatch(decreaseOnboardingStep())
})

export default connect(({ onboarding }) => ({ ...onboarding }), mapDispatchToProps)(Onboarding);