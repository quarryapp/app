// @flow

// state def

export type OnboardingState = {
    complete: boolean,
    step: number
};

const defaultState: OnboardingState = {
    complete: false,
    step: 1
};

// actions
type OnboardingCompleteAction = {
    type: 'ONBOARDING_COMPLETE',
};

type SetOnboardingStepAction = {
    type: 'SET_ONBOARDING_STEP',
    payload: number
};

export type Action = OnboardingCompleteAction | SetOnboardingStepAction;

// reducer
export default (state: OnboardingState = defaultState, action: Action) => {
    switch (action.type) {
        case 'SET_ONBOARDING_STEP':
            return {
                ...state,
                step: action.payload
            }
        case 'ONBOARDING_COMPLETE':
            return {
                ...defaultState,
                complete: true
            }
        default:
            return state;
    }
};

// action creators
export const setOnboardingStep = (step: number): SetOnboardingStepAction => ({
    type: 'SET_ONBOARDING_STEP',
    payload: step
});

export const onboardingComplete = (): OnboardingCompleteAction => ({
    type: 'ONBOARDING_COMPLETE'
});