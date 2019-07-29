//API Endpoints
export const BASEURL_API = 'http://mbrookietraining2019adminbackend-env.mdknpzkmj7.ap-northeast-1.elasticbeanstalk.com';
export const BASEURL_ITEM_IMAGES = 'https://dg9c95ld8mycd.cloudfront.net/items/';
export const URL_GET_ALL_ITEMS = BASEURL_API+'/api/items?offset={0}';
export const URL_POST_ITEM = BASEURL_API+'/api/items';
export const URL_DELETE_ITEM = BASEURL_API+'/api/items/{0}';
export const URL_PUT_ITEM = BASEURL_API+'/api/items/{0}';
export const URL_GET_ALL_CATEGORIES = BASEURL_API+'/api/categories';
export const URL_POST_CATEGORY = BASEURL_API+'/api/categories';
export const URL_PUT_CATEGORY = BASEURL_API+'/api/categories/{0}';
export const URL_DELETE_CATEGORY = BASEURL_API+'/api/categories/{0}';
export const URL_GET_ALL_ORDERS = BASEURL_API+'/api/orders';
export const URL_SEARCH_ORDER = BASEURL_API+'/api/orders?offset={searchText}';
export const URL_GET_ORDERITEMS = BASEURL_API+'/api/orderitems?order_id={0}';
