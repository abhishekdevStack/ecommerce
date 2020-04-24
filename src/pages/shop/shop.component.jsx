import React from "react";
import SHOP_DATA from "./shopData";

import CollectionsOverview from "../../components/collection-overview/collection.overview";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";

const Shop = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default Shop;
