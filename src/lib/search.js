import algoliasearch from "algoliasearch";

const search = async (keyword) => {
  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
  );

  const index = algoliaClient.initIndex("congestion_map_store_info_index");

  const params = {
    hitsPerPage: 100,
    page: 0,
  };

  const req = await index.search(keyword, params);

  // console.log(req.hits);

  return req.hits;
};

export default search;
