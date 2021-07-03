import React from "react";
import OwnerStatsTable from '../Tables/OwnerStatsTable';
import SeasonStatsTable from '../Tables/SeasonStatsTable';

function Stats() {
  return (
    <div className="players">
    <div class="container pb-5 w-100 p-3">
      <h1 class="text-center">Stats</h1>
      <hr class="col-lg-8 mx-auto"/>
      <div class="row align-items-top my-5 mx-auto">
        <div class="col-lg-8 mx-auto">
          <h3>Owner Totals</h3> 
          <OwnerStatsTable/>
        </div>
      </div>
      <div class="row align-items-top my-5 mx-auto">
        <div class="col-lg-12 mx-auto">
          <h3>Season Totals</h3> 
          <SeasonStatsTable/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Stats;
