import Image from "next/image";
import {
  Accountable,
  Impact,
  Integrity,
  Partnership,
  Reliable,
  Safe,
} from "../assets";
import { aboutUsValues } from "../constants";
import "./values.css";

const images = [Accountable, Partnership, Reliable, Safe, Integrity, Impact];

export default function Values() {
  return (
    <div className="values-wrapper">
      <h2 className="values-title">VALUES</h2>
      {aboutUsValues.map(({ value, statement }, index) => (
        <div key={index}>
          {index % 2 === 0 ? (
            <div className="value">
              <Image src={images[index]} alt={value} className="value-image" />
              <p>{statement}</p>
            </div>
          ) : (
            <div className="value">
              <p>{statement}</p>
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
