import "./form.css";
import Label from "../../atoms/Label";
import Input from "../Input";
import { EnrichedForm } from "../../../types/form";

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
    <div className="chart-form-fields" data-testid="form">
      <Label dataTestId="form-label">{nodeName}</Label>
      {formProperties &&
        formProperties.map((property, index) => (
          <Input
            id={property.name}
            dataTestId={`input-${property.name}`}
            name={property.name}
            placeholder={property.name}
            key={index}
            value={
              property.prefill?.prefillValue
                ? getValue(
                    property.name,
                    property.prefill.prefillSourceName!,
                    property.prefill.prefillValue!
                  )
                : ""
            }
            onClick={() =>
              handleOnFormClick(property.name, property.prefill?.prefillValue)
            }
            onClearValue={() => handleClearPrefillValue?.(property.name)}
            readOnly
          />
        ))}
    </div>
  );
};

export default ChartForm;
