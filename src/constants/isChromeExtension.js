// @flow
import { IChromeAPI } from '../entities';

declare var chrome: IChromeAPI;

export default ('extension' in chrome); 