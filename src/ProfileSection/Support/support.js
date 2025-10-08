import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    MDBCol,
    MDBRow,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
} from "mdb-react-ui-kit";
import EmailForm from "./EmailForm";
import LiveChat from "./LiveChat";
import styles from "./support.module.css";

const Support = () => {
    const [activeTab, setActiveTab] = useState('1');

    const handleTabClick = (value) => {
        if (activeTab !== value) {
            setActiveTab(value);
        }
    };

    return (
        <section>
            <MDBRow>
                <MDBCol>
                    <MDBBreadcrumb className="bg-light rounded-3 p-2 mt-2 mr-2">
                        <MDBBreadcrumbItem>
                            <Link to="/dashboard">User</Link>
                        </MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>Support</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBCol>
            </MDBRow>

            <div className="container">
                <div>
                    <div className={`${styles['my-4']}`}>
                        <div className="row text-center">
                            <div className={`col-lg-4 ${styles['ad-red']}`}>
                                <div className={styles['ad-icon']}><i className="fa fa-home fa-2x"></i></div>
                                <h4>Our Location</h4><p>Outer Ring Road, Sarjapura Road <br />
                                    Bangalore - 560035</p>
                            </div>

                            <div className={`col-lg-4 ${styles['ad-blue']}`}>
                                <div className={styles['ad-icon']}><i className="fa fa-phone fa-2x"></i></div>
                                <h4>Telephone</h4><p>(+91) 8400134829<br />(+91) 8542930571</p>
                            </div>
                            <div className={`col-lg-4 ${styles['ad-green']}`}>
                                <div className={styles['ad-icon']}><i className="fa fa-envelope fa-2x"></i></div>
                                <h4>Send email</h4><p>siliconggvofficial@gmail.com <br /> contact@silicontech.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <MDBTabs className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleTabClick('1')} active={activeTab === '1'}>
                            <MDBIcon fas icon="envelope" className="me-2" /> Email Support
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleTabClick('2')} active={activeTab === '2'}>
                            <MDBIcon fas icon="comment-dots" className="me-2" /> Live Chat
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleTabClick('3')} active={activeTab === '3'}>
                            <MDBIcon fas icon="robot" className="me-2" /> Electronics AI Helper
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane show={activeTab === '1'}>
                        <div className="row">
                            <div className="col-md-12">
                                <EmailForm />
                            </div>
                        </div>
                    </MDBTabsPane>

                    <MDBTabsPane show={activeTab === '2'}>
                        <div className="row">
                            <div className="col-md-12">
                                <LiveChat />
                            </div>
                        </div>
                    </MDBTabsPane>

                    <MDBTabsPane show={activeTab === '3'}>
                        <div className="card">
                            <div className="card-header bg-info text-white">
                                <h5 className="mb-0">
                                    <MDBIcon fas icon="robot" className="me-2" />
                                    Electronics AI Helper
                                </h5>
                                <p className="small mb-0">Ask questions about basic electronics concepts</p>
                            </div>
                            <div className="card-body" style={{ minHeight: '300px' }}>
                                <div className="text-center py-5">
                                    <MDBIcon fas icon="microchip" style={{ fontSize: '4rem', color: '#09c' }} />
                                    <h4 className="mt-4">Electronics AI Helper</h4>
                                    <p className="text-muted">
                                        This feature is preserved from the previous implementation.
                                        <br />
                                        You can ask questions about basic electronics concepts here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </MDBTabsPane>
                </MDBTabsContent>
            </div>
        </section>
    );
};

export default Support;
