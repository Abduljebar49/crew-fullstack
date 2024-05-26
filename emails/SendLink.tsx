import {
  Body,
  Container,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import React from "react";

const SendLinkTemplate = ({ name, link }: { name: string; link: string }) => {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <h1>
              Well, you received a request please reply it as soon as possible.
            </h1>
            <p className="py-2">Dear {name},</p>
            <div className="flex px-8">
              <p className="py-2">access the following link to bid, {link},</p>
            </div>

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

export default SendLinkTemplate;
