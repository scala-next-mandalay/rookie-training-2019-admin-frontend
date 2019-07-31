//API Endpoints
export const BASEURL_API = 'http://mbrookietraining2019adminbackend-env.mdknpzkmj7.ap-northeast-1.elasticbeanstalk.com';
export const BASEURL_ITEM_IMAGES = 'https://mb-r2019-admin-front34325ab8ffff499c944a116261594e7c-dev.s3-ap-northeast-1.amazonaws.com/public/';

export const URL_REST_ITEMS = BASEURL_API+'/api/items';
export const URL_REST_CATEGORIES = BASEURL_API+'/api/categories';
export const URL_REST_ORDERS = BASEURL_API+'/api/orders';
export const URL_REST_ORDERITEMSS = BASEURL_API+'/api/orderitems';

export const URL_GET_ALL_ITEMS = BASEURL_API+'/api/items?offset={0}';
export const URL_POST_ITEM = BASEURL_API+'/api/items';
export const URL_DELETE_ITEM = BASEURL_API+'/api/items/{0}';
export const URL_PUT_ITEM = BASEURL_API+'/api/items/{0}';
export const URL_GET_ALL_CATEGORIES = BASEURL_API+'/api/categories';
export const URL_POST_CATEGORY = BASEURL_API+'/api/categories';
export const URL_PUT_CATEGORY = BASEURL_API+'/api/categories/{0}';
export const URL_DELETE_CATEGORY = BASEURL_API+'/api/categories/{0}';
export const URL_GET_ALL_ORDERS = BASEURL_API+'/api/orders';
export const URL_SEARCH_ORDER = BASEURL_API+'/api/orders?search={0}';
export const URL_GET_ORDERITEMS = BASEURL_API+'/api/orderitems?order_id={0}';
