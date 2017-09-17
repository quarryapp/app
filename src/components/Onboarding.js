// @flow

import React from 'react';
import styled from 'styled-components';
import type { OnboardingState } from '../redux/onboarding';
import { connect } from 'react-redux';
import Button from 'material-ui/Button'
import ArrowBack from 'react-icons/lib/md/arrow-back'
import ArrowForward from 'react-icons/lib/md/arrow-forward'

type OnboardingProps = OnboardingState & {};

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(33, 33, 33, 0.38);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    max-width: 950px;
    align-items: center;
`;

const Card = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.237602), 0px 0px 12px rgba(0, 0, 0, 0.12), 0px 6px 6px rgba(0, 0, 0, 0.24), 0px 0px 6px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    margin: 3.8rem;
    padding: 0 7rem 3rem;
    text-align: center;
    overflow-y: auto;
    max-height: 100vh;
    
    p { 
        line-height: 2.6.rem;
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

const IllustrationPlaceholder = styled.div`
    background-color: rgba(33, 33, 33, 0.12);
    width: 58rem;
    height: 40rem;
    margin-bottom: 3rem;
`;

const Onboarding = (props: OnboardingProps) => (
    !props.complete ? (
        <Overlay>
            <Container>
                <Button color="primary" fab disabled={props.step === 1}>
                    <ArrowBack width={16} height={16}/>
                </Button>
                <Card>
                    <IllustrationPlaceholder />
                    <h1>The app that does all</h1>
                    <p>Get all your daily sources in one place</p>
                    <Button color="accent" raised>
                        Get started
                    </Button>
                </Card>
                <Button color="primary" fab disabled={props.step === 4}>
                    <ArrowForward width={16} height={16}/>
                </Button>
            </Container>
        </Overlay>
    ) : null
);

export default connect(({ onboarding }) => ({ ...onboarding }))(Onboarding);