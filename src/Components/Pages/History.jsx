import React from "react";
import KeeperHistoryTable from '../Tables/KeeperHistoryTable';
import DraftHistoryTable from '../Tables/DraftHistoryTable';

function History() {
  return (
    <div className="players">
      <div class="container pb-5 w-100 p-3">
        <h1 class="text-center">History</h1>
        <hr class="col-lg-12 mx-auto"/>
        <div class="row align-items-top pd-5">
          <div class="col-lg-6">
            <h3>Draft History</h3> 
            < DraftHistoryTable/>
          </div>
          <div class="col-lg-6">
            <h3>Keeper History</h3>
            < KeeperHistoryTable/>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default History;
