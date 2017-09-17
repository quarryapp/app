// @flow

import common from 'material-ui/colors/common';
import red from 'material-ui/colors/red';
import { createMuiTheme } from 'material-ui/styles';

const { black, white } = common;

const createColor = (color: string) => {
    // just replaces the entire palette with a single color ¯\_(ツ)_/¯ 
    const colorObject = {};
    for (const key in red) {
        colorObject[key] = color;
    }
    return colorObject;
};

export default createMuiTheme({
    palette: {
        primary: createColor(white),
        secondary: createColor(black),
        error: red,
    },
});