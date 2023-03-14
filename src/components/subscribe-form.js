import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SubscribeFormData } from "@/data";

const IframeComponent = () => {
  const iframeHtml = `
     <section class="commonSection subscribe">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <h4 class="sub_title">REPORTS, OUR EXPERIENCES, HOT FLIES AND UPCOMING EVENTS</h4>
            <h2 class="sec_title">FLY FISHING CONTENT DELIVERED TO YOU MONTHLY</h2>
          </div>
          <div class="col-lg-8">
            <div id="subscribe-form-intel" class="_subscribe-form">
            <iframe src="https://link.intelicontact.com/widget/form/lwwVVnssrvksSWGZxVlr" style="display:none;margin:0;width:100%;height:100%;border:none;border-radius:4px;" id="inline-lwwVVnssrvksSWGZxVlr" data-layout="{'id':'INLINE'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Newsletter Form" data-height="450" data-layout-iframe-id="inline-lwwVVnssrvksSWGZxVlr" data-form-id="lwwVVnssrvksSWGZxVlr"></iframe>
            </div>
            <div class="card subscribe-feat-list">
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">We Deliver -> Fishing Reports</li>
                  <li class="list-group-item">We Deliver -> Tips &amp; Tactics</li>
                  <li class="list-group-item">We Deliver -> Seasonal Insights &amp; Plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
  return (
      <div dangerouslySetInnerHTML={{ __html: iframeHtml }} />
  );
};

export default IframeComponent

{/*const SubscribeForm = () => {
  const { sectionContent } = SubscribeFormData;
  return (
    <section className="commonSection subscribe">
      <Container>
        <Row>
          <Col lg={4}>
            <h4 className="sub_title">{sectionContent.subTitle}</h4>
            <h2 className="sec_title">{sectionContent.title}</h2>
          </Col>
          <Col lg={8}> */}
            {/*<div id="mc_embed_signup">
            <form action="https://gmail.us3.list-manage.com/subscribe/post?u=b61e2eb5f241dbe27bea34345&amp;id=1239cb6c1b" method="post" className="validate subscribefrom about-page-subscribe" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate>
              <input type="email" placeholder="Enter your email here, then Sign Up >" name="EMAIL" className="email" id="mce-EMAIL" required />
              <button className="common_btn red_bg about-sub-btn" type="submit" name="submit">
                <span>Sign Up!</span>
              </button>
            </form>
            </div>*/}
{/*}  <div className="card subscribe-feat-list">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">We Deliver -> Fishing Reports</li>
                  <li className="list-group-item">We Deliver -> Tips &amp; Tactics</li>
                  <li className="list-group-item">We Deliver -> Seasonal Insights &amp; Plans</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SubscribeForm; */}
