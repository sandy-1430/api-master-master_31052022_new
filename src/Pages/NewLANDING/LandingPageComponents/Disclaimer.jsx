import React from "react";

const Disclaimer = () => {
  return (
    <section className="container-fluid" id="disclaimer">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-12">
          <h4 className="my-5 underline">D I S C L A I M E R &nbsp; &nbsp;</h4>
        </div>
        <div className="row" style={{ paddingLeft: "3%" }}>
          <div className="col-md-12 ">
            <div className="col-md-12 ">
              <span>1. All question papers will be in English other than language papers.</span>
            </div>
            <div className="col-md-12 ">
              <span>2. Live classes will be available only for General Test (mental ability, quantitative reasoning, verbal ability, etc.).</span>
            </div>
            <div className="col-md-12 ">
              <span>3. Live classes will be in English/Hindi.</span>
            </div>
            <div className="col-md-12 ">
              <span>4. Students can avail 4 domain subjects, one language paper and the general tests after subscription.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Disclaimer);
