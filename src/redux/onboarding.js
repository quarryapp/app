// @flow

// state def

export type OnboardingState = {
    complete: boolean,
    step: number
};

const defaultState: OnboardingState = {
    complete: false,
    step: 0,
};

// actions
type OnboardingCompleteAction = {
    type: 'ONBOARDING_COMPLETE',
};

type IncreaseOnboardingStep = {
    type: 'INCREASE_ONBOARDING_STEP',
};

type DecreaseOnboardingStep = {
    type: 'DECREASE_ONBOARDING_STEP',
};

export type Action = OnboardingCompleteAction | IncreaseOnboardingStep | DecreaseOnboardingStep;

// reducer
export default (state: OnboardingState = defaultState, action: Action) => {
    switch (action.type) {
        case 'INCREASE_ONBOARDING_STEP':
            return {
                ...state,
                step: state.step + 1,
            };
        case 'DECREASE_ONBOARDING_STEP':
            return {
                ...state,
                step: state.step - 1,
            };
        case 'ONBOARDING_COMPLETE':
            return {
                ...defaultState,
                complete: true,
            };
        default:
            return state;
    }
};

// action creators
export const increaseOnboardingStep = (): IncreaseOnboardingStep => ({
    type: 'INCREASE_ONBOARDING_STEP',
});

export const decreaseOnboardingStep = (): DecreaseOnboardingStep => ({
    type: 'DECREASE_ONBOARDING_STEP',
});

export const onboardingComplete = (): OnboardingCompleteAction => ({
    type: 'ONBOARDING_COMPLETE',
});