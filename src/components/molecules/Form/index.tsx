import "./form.css";
import Label from "../../atoms/Label";
import Input from "../Input";
import { EnrichedForm } from "../../../types/form";
import { FORM_NAME } from "../../../constants";

type FormProps = {
  form: EnrichedForm;
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

  const getValue = (
    name: string,
    prefillSourceName: string,
    prefillValue: string
  ) => `${name}: ${prefillSourceName}.${prefillValue}`;

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
            value={
              property.prefill.prefillValue
                ? getValue(
                    property.name,
                    property.prefill.prefillSourceName!,
                    property.prefill.prefillValue!
                  )
                : ""
            }
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
