import "./index.css";
import { MappedNodeForm } from "../../../types/form";
import Label from "../../atoms/Label";
import Input from "../Input";
import { FORM_NAME } from "../../../constants";

type FormProps = {
  form: MappedNodeForm;
  handleClick?: (name: string) => void;
  handleClearPrefillValue?: (name: string) => void;
};

const ChartForm = ({
  form,
  handleClick,
  handleClearPrefillValue,
}: FormProps) => {
  const { nodeName, formProperties } = form;
  const handleOnFormClick = (name: string, prefillValue?: string) =>
    !prefillValue && handleClick?.(name);

  return (
    <div className="chart-form-fields">
      <Label>
        {FORM_NAME} {nodeName}
      </Label>
      {formProperties &&
        formProperties.map((property, index) => (
          <Input
            id={property.name}
            placeholder={property.name}
            key={index}
            value={property.prefill.prefillValue}
            onClick={() =>
              handleOnFormClick(property.name, property.prefill.prefillValue)
            }
            onClearValue={() => handleClearPrefillValue?.(property.name)}
            readOnly
          />
        ))}
    </div>
  );
};

export default ChartForm;
