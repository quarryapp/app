// import GitHub from '../components/cardcontents/GitHub';
import DefaultContent from '../components/cardcontents/DefaultContent';

export default (type: string) => {
    
    switch(type) {
        // case 'github':
        //     return GitHub;
        default:
            return DefaultContent; 
    }
};