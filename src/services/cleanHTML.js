import striptags from 'striptags';
import { AllHtmlEntities } from 'html-entities';

// strips all HTML tags, but parses HTML entities
export default (input: string) => AllHtmlEntities.decode(striptags(input));