import React from "react";
import classes from "./Messages.module.css";

const Messages=()=>{
    return(
        <div class="row">
        <div class="col-md-12 col-xl-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-row justify-content-between">
                <h4 class="card-title">Important Messages</h4>
                <p class="text-muted mb-1 small">View all</p>
              </div>
              <div class="preview-list">
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <img
                      src="assets/images/faces/face6.jpg"
                      alt="image"
                      class="rounded-circle"
                    />
                  </div>
                  <div class="preview-item-content d-flex flex-grow">
                    <div class="flex-grow">
                      <div
                        class="d-flex d-md-block d-xl-flex justify-content-between"
                      >
                        <h6 class="preview-subject">Muhammad</h6>
                        <p class="text-muted text-small">5 minutes ago</p>
                      </div>
                      <p class="text-muted">
                        Well, it seems to be Broken.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <img
                      src="assets/images/faces/face6.jpg"
                      alt="image"
                      class="rounded-circle"
                    />
                  </div>
                  <div class="preview-item-content d-flex flex-grow">
                    <div class="flex-grow">
                      <div
                        class="d-flex d-md-block d-xl-flex justify-content-between"
                      >
                        <h6 class="preview-subject">Ahmed</h6>
                        <p class="text-muted text-small">
                          10 Minutes Ago
                        </p>
                      </div>
                      <p class="text-muted">
                        Well, it seems to be Broken.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <img
                      src="assets/images/faces/face6.jpg"
                      alt="image"
                      class="rounded-circle"
                    />
                  </div>
                  <div class="preview-item-content d-flex flex-grow">
                    <div class="flex-grow">
                      <div
                        class="d-flex d-md-block d-xl-flex justify-content-between"
                      >
                        <h6 class="preview-subject">Afnan</h6>
                        <p class="text-muted text-small">2 Hours Ago</p>
                      </div>
                      <p class="text-muted">Please review the tickets</p>
                    </div>
                  </div>
                </div>
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <img
                      src="assets/images/faces/face6.jpg"
                      alt="image"
                      class="rounded-circle"
                    />
                  </div>
                  <div class="preview-item-content d-flex flex-grow">
                    <div class="flex-grow">
                      <div
                        class="d-flex d-md-block d-xl-flex justify-content-between"
                      >
                        <h6 class="preview-subject">Noman</h6>
                        <p class="text-muted text-small">4 Hours Ago</p>
                      </div>
                      <p class="text-muted">
                        Need Urgent Help. Please Call.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <img
                      src="assets/images/faces/face6.jpg"
                      alt="image"
                      class="rounded-circle"
                    />
                  </div>
                  <div class="preview-item-content d-flex flex-grow">
                    <div class="flex-grow">
                      <div
                        class="d-flex d-md-block d-xl-flex justify-content-between"
                      >
                        <h6 class="preview-subject">Noman</h6>
                        <p class="text-muted text-small">4 Hours Ago</p>
                      </div>
                      <p class="text-muted">
                        Thanks a lot. But not working .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    )
}

export default Messages