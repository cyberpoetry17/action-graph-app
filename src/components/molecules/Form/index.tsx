import "./index.css";
import { MappedNodeForm } from "../../../types/form";
import Label from "../../atoms/Label";
import Input from "../Input";
import { FORM_NAME } from "../../../constants";

type FormProps = {
  form: MappedNodeForm;
  handleClick?: () => void;
  handleClearPrefillValue?: (name: string) => void;
};

const ChartForm = ({
  form,
  handleClick,
  handleClearPrefillValue,
}: FormProps) => {
  const { nodeName, formProperties } = form;
  const handleOnFormClick = (prefillValue?: string) =>
    !prefillValue && handleClick?.();

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
            value={property.prefillValue}
            onClick={() => handleOnFormClick(property.prefillValue)}
            onClearValue={() => handleClearPrefillValue?.(property.name)}
            readOnly
          />
        ))}
    </div>
  );
};

export default ChartForm;
