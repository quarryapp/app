// @flow
import { ChromeAPI } from '../entities';

declare var chrome: ChromeAPI;

export default ('extension' in chrome); 