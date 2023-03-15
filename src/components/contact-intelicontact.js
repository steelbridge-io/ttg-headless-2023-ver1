import React from "react"import { ContactFormTitle } from "@/data";const { subTitle, title, description } = ContactFormTitle;class ContactInteli extends React.Component {    render() {        return (            <section className="commonSection ContactPage">                <div className="container">                    <div className="row">                        <div className="col-lg-12 text-center">                        <h2 className="sec_title">{title}</h2>                        <p className="sec_desc">{description}</p>                        </div>                    </div>                    <div className="row">                        <div id="contact-intelicontact" className="container">                        <iframe src="https://link.intelicontact.com/widget/form/jL53sAbi8C8ikl5OjhGG" id="inline-jL53sAbi8C8ikl5OjhGG" data-layout="{'id':'INLINE'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Contact Us Form" data-height="697" data-layout-iframe-id="inline-jL53sAbi8C8ikl5OjhGG" data-form-id="jL53sAbi8C8ikl5OjhGG"></iframe>                        </div>                    </div>                </div>            </section>        )    }}export default ContactInteli