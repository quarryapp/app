import GitHub from '../components/cardcontents/GitHub';
import DefaultContent from '../components/cardcontents/DefaultContent';
import Feedly from '../components/cardcontents/Feedly';
import Dribbble from '../components/cardcontents/Dribbble';

export default (type: string) => {
    
    switch(type) {
        case 'github':
            return GitHub;
        case 'dribbble':
            return Dribbble;
        case 'feedly':
            return Feedly;
        default:
            return DefaultContent; 
    }
};