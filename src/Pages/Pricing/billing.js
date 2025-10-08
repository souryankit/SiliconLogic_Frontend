import { React, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const Checkout = () => {
    return (
        <>           
            <section class="course-content checkout-widget">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">

                            <div class="student-widget">
                                <div class="student-widget-group add-course-info">
                                    <div class="cart-head">
                                        <h4>Billing Address</h4>
                                    </div>
                                    <div class="checkout-form">
                                        <form action="#">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="input-block">
                                                        <label class="form-control-label">First Name</label>
                                                        <input type="text" class="form-control" placeholder="Enter your first Name"></input>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="input-block">
                                                        <label class="form-control-label">Last Name</label>
                                                        <input type="text" class="form-control" placeholder="Enter your last Name"></input>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="input-block">
                                                        <label class="form-control-label">Phone Number (Optional)</label>
                                                        <input type="text" class="form-control" placeholder="Phone Number"></input>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="input-block">
                                                        <label class="form-control-label">Address Line 1</label>
                                                        <input type="text" class="form-control" placeholder="Address"></input>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="input-block">
                                                        <label class="form-control-label">Address Line 2 (Optional)</label>
                                                        <input type="text" class="form-control" placeholder="Address"></input>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="input-block">
                                                        <label class="form-label">State</label>
                                                        <select class="form-select select" name="sellist1">
                                                            <option>Select State</option>
                                                            <option>Brazil</option>
                                                            <option>French</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="input-block">
                                                        <label class="form-label">Country</label>
                                                        <select class="form-select select" name="sellist1">
                                                            <option>Select country</option>
                                                            <option>India</option>
                                                            <option>America</option>
                                                            <option>London</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="input-block">
                                                        <label class="form-control-label">Zip/Postal Code</label>
                                                        <input type="text" class="form-control"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 col-lg-10">
                                                    <div class="input-block ship-check">
                                                        <input class="form-check-input" type="checkbox" name="remember"></input>
                                                            Shipping address is the same as my billing address
                                                    </div>
                                                    <div class="input-block ship-check mb-0">
                                                        <input class="form-check-input" type="checkbox" name="remember"></input>
                                                            Save this information for next time
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>


                            <div class="student-widget pay-method">
                                <div class="student-widget-group add-course-info">
                                    <div class="cart-head">
                                        <h4>Payment Method</h4>
                                    </div>
                                    <div class="checkout-form">
                                        <form action="cart.html">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="wallet-method">
                                                        <label class="radio-inline custom_radio me-4">
                                                            <input type="radio" name="optradio" checked></input>
                                                                <span class="checkmark"></span> Credit or Debit card
                                                        </label>
                                                        <label class="radio-inline custom_radio">
                                                            <input type="radio" name="optradio"></input>
                                                                <span class="checkmark"></span> PayPal
                                                        </label>
                                                    </div>
                                                    <div class="input-block">
                                                        <label class="form-control-label">Card Number</label>
                                                        <input type="text" class="form-control" placeholder="XXXX XXXX XXXX XXXX"></input>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="input-block">
                                                        <label class="form-label">Month</label>
                                                        <select class="form-select select" name="sellist1">
                                                            <option>Month</option>
                                                            <option>Jun</option>
                                                            <option>Feb</option>
                                                            <option>March</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="input-block">
                                                        <label class="form-label">Year</label>
                                                        <select class="form-select select" name="sellist1">
                                                            <option>Year</option>
                                                            <option>2024</option>
                                                            <option>2021</option>
                                                            <option>2020</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="input-block">
                                                        <label class="form-control-label">CVV Code </label>
                                                        <input type="text" class="form-control" placeholder="XXXX"></input>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="input-block">
                                                        <label class="form-control-label">Name on Card</label>
                                                        <input type="text" class="form-control" placeholder="Address"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 col-lg-10">
                                                    <div class="input-block ship-check">
                                                        <input class="form-check-input" type="checkbox" name="remember"></input>
                                                            Remember this card
                                                    </div>
                                                </div>
                                                <div class="payment-btn">
                                                    <button class="btn btn-primary" type="submit">Make Payment</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-4 theiaStickySidebar">
                            <div class="student-widget select-plan-group">
                                <div class="student-widget-group">
                                    <div class="plan-header">
                                        <h4>Selected Plan</h4>
                                    </div>
                                    <div class="basic-plan">
                                        <h3>Basic</h3>
                                        <p>For individuals who just need to start with the basic features</p>
                                        <p>per user, per month when billed monthly</p>
                                        <h2><span>₹</span>999.0</h2>
                                    </div>
                                    <div class="benifits-feature">
                                        <h3>Benefits</h3>
                                        <ul>
                                            <li><i class="fas fa-circle"></i> Access to slack community</li>
                                            <li><i class="fas fa-circle"></i> Access to support team</li>
                                            <li><i class="fas fa-circle"></i> Algorithmic bidding</li>
                                            <li><i class="fas fa-circle"></i> Keyword and ASIN harvesting</li>
                                        </ul>
                                    </div>
                                    <div class="benifits-feature">
                                        <h3>Features</h3>
                                        <ul>
                                            <li><i class="fas fa-circle"></i> Search term isolation</li>
                                            <li><i class="fas fa-circle"></i> Total sales analytics</li>
                                            <li><i class="fas fa-circle"></i> Best seller rank</li>
                                            <li><i class="fas fa-circle"></i> Placement optimization</li>
                                        </ul>
                                    </div>
                                    <div class="plan-change">
                                        <Link to="/pricing" class="btn btn-primary">Change the Plan</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Checkout;