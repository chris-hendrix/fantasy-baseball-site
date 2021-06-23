import React from "react";
import PlayerTable from '../Tables/PlayerTable';
import DraftTable from '../Tables/DraftTable';

function Draft() {
  return (
    <div className="players">
      <div class="container pb-5">
        <div class="row align-items-top my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Draft</h1>
            <DraftTable/>  
          </div>
          <div class="col-lg-7">
            <h1 class="font-weight-light">Players</h1>
            <PlayerTable/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draft;
