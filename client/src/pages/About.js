import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="row aboutus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="About Us"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p className="text-justify mt-2">
            At Daily Grocer, our mission is to revolutionize the way people shop for groceries online. We are dedicated to providing a seamless, user-friendly platform that offers a wide range of high-quality products at competitive prices. Our goal is to make grocery shopping convenient, efficient, and enjoyable for everyone.
          </p>
          
          <h2>Who We Are</h2>
          <p className="text-justify mt-2">
            Founded in 2024, Daily Grocer is a leading e-commerce platform specializing in groceries. Our team is passionate about technology and customer service, working tirelessly to ensure that our users have the best shopping experience possible. We leverage the latest technologies to bring you an intuitive and reliable online shopping environment.
          </p>
          
          <h2>Our Values</h2>
          <ul className="text-justify mt-2">
            <li><strong>Customer Focus:</strong> We prioritize our customers' needs and strive to exceed their expectations with every interaction.</li>
            <li><strong>Integrity:</strong> We conduct our business with transparency, honesty, and fairness, ensuring trust and confidence in our services.</li>
            <li><strong>Innovation:</strong> We embrace new ideas and technologies to continually enhance our platform and services.</li>
            <li><strong>Sustainability:</strong> We are committed to sustainable practices that benefit both our customers and the environment, including eco-friendly packaging and responsible sourcing.</li>
          </ul>

          <h2>Our Team</h2>
          <ul className="text-justify mt-2">
            <li><strong>Devashish - Founder & CEO:</strong> Overseeing all operations and ensuring the best user experience, Devashish is dedicated to driving innovation and excellence at Daily Grocer.</li>
          </ul>

          <h2>Our Journey</h2>
          <p className="text-justify mt-2">
            From our humble beginnings in early 2024, Daily Grocer has rapidly grown to become a leading name in online grocery shopping. Our journey has been marked by continuous improvement and a commitment to meeting the evolving needs of our users. Major milestones include the launch of our user-friendly platform and the integration of advanced payment and inventory systems.
          </p>
          
          <h2>Get in Touch</h2>
          <p className="text-justify mt-2">
            We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us.
          </p>
          <ul className="text-justify mt-2">
            <li><strong>Email:</strong> <a href="mailto:contact@dailygrocer.com">contact@dailygrocer.com</a></li>
            <li><strong>Phone:</strong> +91 123 456 7890</li>
            <li><strong>Social Media:</strong> <a href="https://facebook.com/dailygrocer" target="_blank" rel="noopener noreferrer">Facebook</a> | <a href="https://twitter.com/dailygrocer" target="_blank" rel="noopener noreferrer">Twitter</a> | <a href="https://instagram.com/dailygrocer" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
