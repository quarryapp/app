// @flow

import { ICard } from './';

export type IFeedlyCard = ICard & {
    data: {
        direction: string,
        content: {
            content: string,
            direction: string
        },
        visual: {
            edgeCacheUrl: string,
            processor: string,
            url: string,
            width: number,
            height: number,
            expirationDate: number,
            contentType: string
        }
    }
}

export type IGitHubCard = ICard & {
    data: {
        description: string,
        language: string
    }
}

export type IDribbbleCard = ICard & {
    data: {
        images: {
            hidpi: ?string,
            normal: string,
            teaser: string
        },
        language: string
    }
}