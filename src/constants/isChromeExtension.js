// @flow
import { IChromeAPI } from '../entities';

declare var chrome: IChromeAPI;

export default ('chrome' in window && 'extension' in chrome); 