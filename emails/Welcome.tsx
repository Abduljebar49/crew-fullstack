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
        <Preview>{name} Welcome to EasyConnect</Preview>
        <Body className="bg-gray-100 p-6">
          <Container className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-blue-600">
              Welcome to EasyConnect Medical Pharmaceuticals!
            </h1>
            <p className="text-gray-800">Dear {name},</p>
            <p className="text-gray-800 my-4">
              Welcome to EasyConnect Medical Pharmaceuticals! We are thrilled to
              have you join our platform dedicated to simplifying the connection
              between importers, distributors, and pharmacies in the
              pharmaceutical industry.
            </p>
            <p className="text-gray-800 my-4">
              At EasyConnect, our mission is to streamline the process of
              accessing and distributing medical pharmaceutical items, making it
              efficient and hassle-free for all parties involved. Whether you
              are an importer looking to source high-quality products, a
              distributor seeking new partnerships, or a pharmacy aiming to
              expand your inventory, EasyConnect is here to support your needs.
            </p>
            <p className="text-gray-800 my-4">Here are a few key features and benefits of our platform:</p>
            <ol className="list-decimal list-inside text-gray-800 my-4">
              <li className="my-2">
                <strong>Effortless Connectivity:</strong> Our user-friendly
                interface makes it easy to connect with potential partners and
                streamline communication and transactions.
              </li>
              <li className="my-2">
                <strong>Wide Range of Products:</strong> Explore a diverse range
                of medical pharmaceutical items from trusted suppliers, ensuring
                you have access to the products your business needs.
              </li>
              <li className="my-2">
                <strong>Secure Transactions:</strong> Rest assured that all
                transactions on EasyConnect are secure and transparent,
                providing peace of mind throughout the procurement process.
              </li>
              <li className="my-2">
                <strong>Real-Time Updates:</strong> Stay informed with real-time
                updates on product availability, pricing, and shipment statuses,
                keeping you in control of your operations.
              </li>
              <li className="my-2">
                <strong>Dedicated Support:</strong> Our customer support team is
                available to assist you every step of the way, ensuring a smooth
                and seamless experience on our platform.
              </li>
            </ol>
            <p className="text-gray-800 my-4">
              To get started, simply log in to your EasyConnect account using
              the credentials provided. Explore our platform, connect with
              potential partners, and start optimizing your supply chain today.
            </p>
            <p className="text-gray-800 my-4">
              Thank you for choosing EasyConnect Medical Pharmaceuticals. We
              look forward to empowering your business and facilitating
              successful partnerships within the pharmaceutical industry.
            </p>
            <p className="text-gray-800 my-4">Best regards,</p>
            <p className="text-gray-800">
              Abduljebar Sani
              <br />
              COO EasyConnect
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
