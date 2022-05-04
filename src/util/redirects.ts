import pmap from 'p-map';
import MediaWiki from '../MediaWiki';
import Downloader from '../Downloader';
import { redirectsXId, articleDetailXId } from '../stores';
import { getArticlesByIds, getArticlesByNS } from './mw-api';
import { filterArticleIdsFromList } from './filterArticleIds';

export async function getArticleIds(downloader: Downloader, mw: MediaWiki, mainPage?: string, articleIds?: string[], articleIdRegexFilter?: RegExp) {
    if (mainPage) {
        await getArticlesByIds([mainPage], downloader);
    }

    if (articleIds) {
        articleIds = filterArticleIdsFromList(articleIds, articleIdRegexFilter);
        await getArticlesByIds(articleIds, downloader);
    } else {
        await pmap(
            mw.namespacesToMirror,
            (namespace: string) => {
                return getArticlesByNS(mw.namespaces[namespace].num, downloader, undefined, articleIdRegexFilter);
            },
            {concurrency: downloader.speed}
        );
    }
}
