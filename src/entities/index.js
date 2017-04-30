// only the parts we need are typed...

export type ChromeAPI = {
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