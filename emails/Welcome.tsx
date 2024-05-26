import {
  Body,
  Container,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import React from "react";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Tailwind>
        <Preview>{name} Welcome to Easy</Preview>
        <Body className="bg-white">
          <Container>
            <h1>Welcome to EasyConnect Medical Pharmaceuticals!</h1>
            <p>Dear {name},</p>
            <p>
              Welcome to EasyConnect Medical Pharmaceuticals! We are thrilled to
              have you join our platform dedicated to simplifying the connection
              between importers, distributors, and pharmacies in the
              pharmaceutical industry.
            </p>
            <p>
              At EasyConnect, our mission is to streamline the process of
              accessing and distributing medical pharmaceutical items, making it
              efficient and hassle-free for all parties involved. Whether you
              are an importer looking to source high-quality products, a
              distributor seeking new partnerships, or a pharmacy aiming to
              expand your inventory, EasyConnect is here to support your needs.
            </p>
            <p>Here are a few key features and benefits of our platform:</p>
            <ol>
              <li>
                <strong>Effortless Connectivity:</strong> Our user-friendly
                interface makes it easy to connect with potential partners and
                streamline communication and transactions.
              </li>
              <li>
                <strong>Wide Range of Products:</strong> Explore a diverse range
                of medical pharmaceutical items from trusted suppliers, ensuring
                you have access to the products your business needs.
              </li>
              <li>
                <strong>Secure Transactions:</strong> Rest assured that all
                transactions on EasyConnect are secure and transparent,
                providing peace of mind throughout the procurement process.
              </li>
              <li>
                <strong>Real-Time Updates:</strong> Stay informed with real-time
                updates on product availability, pricing, and shipment statuses,
                keeping you in control of your operations.
              </li>
              <li>
                <strong>Dedicated Support:</strong> Our customer support team is
                available to assist you every step of the way, ensuring a smooth
                and seamless experience on our platform.
              </li>
            </ol>
            <p>
              To get started, simply log in to your EasyConnect account using
              the credentials provided. Explore our platform, connect with
              potential partners, and start optimizing your supply chain today.
            </p>
            <p>
              Thank you for choosing EasyConnect Medical Pharmaceuticals. We
              look forward to empowering your business and facilitating
              successful partnerships within the pharmaceutical industry.
            </p>
            <p>Best regards,</p>
            <p>
              Abduljebar Sani
              <br />
              COO Easy
              <br />
              EasyConnect Medical Pharmaceuticals
            </p>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
