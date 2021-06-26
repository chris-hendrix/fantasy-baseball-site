import React from "react";
import KeeperTable from '../Tables/KeeperTable';

function Keepers() {
  return (
    <div className="players">
    <div class="container pb-5 w-100 p-3">
      <h1 class="text-center">Keepers</h1>
      <hr class="col-lg-6 mx-auto"/>
      <div class="row align-items-top my-5 mx-auto">
        <div class="col-lg-6 mx-auto">
          <KeeperTable/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Keepers;
