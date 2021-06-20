import React from "react";
import PlayerTable from '../Tables/PlayerTable';

function Draft() {
  return (
    <div className="players">
      <div class="container">
        <div class="row align-items-top my-5">
          <div class="col-lg-7">
            <h1>Players</h1>
            <PlayerTable/>
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">About</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draft;
