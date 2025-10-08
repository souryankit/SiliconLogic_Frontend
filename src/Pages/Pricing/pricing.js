import { React, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import useScrollAnimation from '../../hooks/useScrollAnimation';

const PricingPlans = () => {
    // Use the scroll animation hook
    useScrollAnimation();
    
    // State to track which plan is selected
    const [selectedPlan, setSelectedPlan] = useState("Basic");
    
    // Plan-specific benefits and features
    const planDetails = {
        Basic: {
            benefits: [
                "Access to slack community",
                "Access to support team"
            ],
            features: [
                "Search term isolation",
                "Total sales analytics"
            ]
        },
        Team: {
            benefits: [
                "Access to slack community",
                "Access to support team",
                "Algorithmic bidding",
                "Keyword and ASIN harvesting"
            ],
            features: [
                "Search term isolation",
                "Total sales analytics",
                "Best seller rank",
                "Placement optimization"
            ]
        },
        Enterprise: {
            benefits: [
                "Access to slack community",
                "Access to support team",
                "Algorithmic bidding",
                "Keyword and ASIN harvesting",
                "Priority customer support",
                "Dedicated account manager"
            ],
            features: [
                "Search term isolation",
                "Total sales analytics",
                "Best seller rank",
                "Placement optimization",
                "Advanced analytics dashboard",
                "Custom reporting",
                "API access"
            ]
        }
    };
    
    return (
        <>
            <section>
            <div className="pagetitle"> <b>Our Pricing</b></div>
                <div class="container">                 
                    <div class="row">
                        <div class="col-5 text-center mx-auto">
                            {/* <div class="title-sec">
                                <h5>We keep it simple</h5>
                                <h2>Choose The Right Plan</h2>
                                <p>Improve the way your work, discover a brand new tool and drop the hassle once and for all.</p>
                            </div> */}
                            
                            <div class="enable-item">
                                <label class="mb-0 me-2">Monthly</label>
                                <div class="form-check form-switch check-on m-2">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" toggle></input>
                                </div>
                                <label class="mb-0 px-4">Annualy</label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div 
                                class={`plan-box ${selectedPlan === "Basic" ? "active" : ""}`} 
                                onClick={() => setSelectedPlan("Basic")}
                                style={selectedPlan === "Basic" ? {border: '2px solid rgb(144, 0, 255)', boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'} : {}}
                            >
                                <div>
                                    <h4>Basic</h4>
                                    <p>For individuals who just need to start with the basic features</p>
                                    <p>per user, per month when billed Annualy</p>
                                </div>
                                <h3><span>₹</span>999.0</h3>
                            </div>
                            <div 
                                class={`plan-box ${selectedPlan === "Team" ? "active" : ""}`}
                                onClick={() => setSelectedPlan("Team")}
                                style={selectedPlan === "Team" ? {border: '2px solid rgb(144, 0, 255)', boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'} : {}}
                            >
                                <div>
                                    <h4>Team</h4>
                                    <p>For individuals who just need to start with the basic features</p>
                                    <p>per team, per month when billed Annualy</p>
                                </div>
                                <h3><span>₹</span>4999.0</h3>
                            </div>
                            <div 
                                class={`plan-box ${selectedPlan === "Enterprise" ? "active" : ""}`}
                                onClick={() => setSelectedPlan("Enterprise")}
                                style={selectedPlan === "Enterprise" ? {border: '2px solid rgb(144, 0, 255)', boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)'} : {}}
                            >
                                <div>
                                    <h4>Enterprise</h4>
                                    <p>For individuals who just need to start with the basic features</p>
                                    <p> per month when billed Annualy</p>
                                </div>
                                <h3><span>₹</span>12999.0</h3>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="benefit-box">
                                <h5>Benefits</h5>
                                <ul>
                                    {planDetails[selectedPlan].benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                                <h5>Features</h5>
                                <ul>
                                    {planDetails[selectedPlan].features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                <Link to="/billing" class="btn btn-primary w-100">Start with {selectedPlan}</Link>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-lg-12">
                            <h2 class="main-title text-center">Compare our plans</h2>
                            <div class="table-responsive">
                                <table class="table table-bordered table-price">
                                    <thead>
                                        <tr>
                                            <td>Benefits</td>
                                            <td class="text-center self-cell">Individuals & Self-Learner </td>
                                            <td colspan="2" class="text-center business-cell">Institutions that need progress tracker & group access for thier students</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="basic-cell">
                                            <td></td>
                                            <td class="text-center">Basic</td>
                                            <td class="text-center">Team</td>
                                            <td class="text-center">Pro</td>
                                        </tr>
                                        <tr>
                                            <td>Separate business/personal</td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Estimate tax payments</td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Track deductible mileage</td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Download online banking</td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Multi-device</td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Create invoices & estimates </td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Manage VAT </td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Manage bills & payments </td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Multiple currencies </td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Create budgets</td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                        <tr>
                                            <td>Track time</td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/close-circle.svg" alt="icon"></img></td>
                                            <td class="text-center"><img src="/icon/check-circle.svg" alt="icon"></img></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default PricingPlans;