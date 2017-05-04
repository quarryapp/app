// import GitHub from '../components/cardcontents/GitHub';
import DefaultContent from '../components/cardcontents/DefaultContent';
import Feedly from '../components/cardcontents/Feedly';

export default (type: string) => {
    
    switch(type) {
        // case 'github':
        //     return GitHub;
        case 'feedly':
            return Feedly;
        default:
            return DefaultContent; 
    }
};