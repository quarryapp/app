// only the parts we need are typed...

export type IChromeAPI = {
    runtime: {
        lastError: Error
    },
    storage: {
        sync: {
            set: (key: string, value: any) => void,
            get: (key: string) => any,
            remove: (key: string) => any
        }
    },
    
    // type this if we ever use it's contents... for now only used to check if we're an extension.
    extension: any 
}

export type ICard = {
    type: string,
    size: 'small' | 'medium' | 'large',
    score: number,
    timestamp: number, // publication date
    title: string, // title
    data: any // element specific data (will be passed as props to element)
}