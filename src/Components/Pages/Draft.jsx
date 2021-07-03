import React from "react";
import PlayerTable from '../Tables/PlayerTable';
import DraftTable from '../Tables/DraftTable';
import OwnerDraftTable from '../Tables/OwnerDraftTable';

function Draft() {
  return (
    <div className="players">
      <div class="container pb-5 w-100 p-3">
        <h1 class="text-center">Draft</h1>
        <hr class="col-lg-14 mx-auto"/>
        <div class="row align-items-top my-5">
          <div class="col-lg-14">
          <h3>Owners</h3>
            <OwnerDraftTable/>
          </div>
        </div>
        <div class="row align-items-top pd-5">
          <div class="col-lg-6">
            <h3>Draft</h3>
            <DraftTable/>  
          </div>
          <div class="col-lg-6">
            <h3>Players</h3>
            <PlayerTable/>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Draft;
