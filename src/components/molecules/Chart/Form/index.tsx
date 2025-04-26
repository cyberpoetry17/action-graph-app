import { MappedForm } from "../../../../types/form";
import "./index.css";

type FormProps = {
  form: MappedForm;
};

const ChartForm = ({ form }: FormProps) => {
  const { name, id, properties } = form;
  return (
    <div className="chart-form-fields">
      <label>Form name: {name}</label>
      <label>Form id: {id}</label>
      {properties &&
        properties.map((property, index) => (
          <input
            placeholder={property.name}
            key={index}
            value={property.prefillValue}
            onClick={() => {
              console.log("Clicked on a form");
            }}
          />
        ))}
    </div>
  );
};

export default ChartForm;
