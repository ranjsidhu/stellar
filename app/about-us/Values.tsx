import "./values.css";

import {
  Accountable,
  Impact,
  Integrity,
  Partnership,
  Reliable,
  Safe,
} from "../assets";

import Image from "next/image";
import { aboutUsValues } from "../constants";

const images = [Accountable, Partnership, Reliable, Safe, Integrity, Impact];

export default function Values() {
  return (
    <div className="values-wrapper">
      <h2 className="values-title">VALUES</h2>
      {aboutUsValues.map(({ value, statement }, index) => (
        <div key={index} className="value-wrapper">
          {index % 2 === 0 ? (
            <div className="value">
              <Image src={images[index]} alt={value} className="value-image" />
              <p className="value-statement">{statement}</p>
            </div>
          ) : (
            <div className="value">
              <p className="value-statement">{statement}</p>
              <Image
                src={images[index]}
                alt="value-image"
                className="value-image"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
