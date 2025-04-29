import { act, render, screen } from "@testing-library/react";
import GraphPage from "./GraphPage";
import { FormProvider } from "../../store";


const mockedActionGraph = {
  "$schema": "test",
  "id": "test",
  "tenant_id": "1",
  "name": "test",
  "description": "test",
  "category": "test 4",
  "nodes": [
    {
      "id": "test",
      "type": "form",
      "position": {
        "x": 0,
        "y": 0
      },
      "data": {
        "id": "test",
        "component_key": "test",
        "component_type": "form",
        "component_id": "test",
        "name": "Form F",
        "prerequisites": [
        ],
        "permitted_roles": [],
        "input_mapping": {},
        "sla_duration": {
          "number": 0,
          "unit": "minutes"
        },
        "approval_required": false,
        "approval_roles": []
      }
    },

  ],
  "edges": [
    
  ],
  "forms": [
    {
      "id": "f_01jk7ap2r3ewf9gx6a9r09gzjv",
      "name": "test form",
      "description": "test",
      "is_reusable": false,
      "field_schema": {
        "type": "object",
        "properties": {
          "button": {
            "avantos_type": "button",
            "title": "Button",
            "type": "object"
          },
          "dynamic_checkbox_group": {
            "avantos_type": "checkbox-group",
            "items": {
              "enum": [
                "foo",
                "bar",
                "foobar"
              ],
              "type": "string"
            },
            "type": "array",
            "uniqueItems": true
          },
          "dynamic_object": {
            "avantos_type": "object-enum",
            "enum": null,
            "title": "Dynamic Object",
            "type": "object"
          },
          "email": {
            "avantos_type": "short-text",
            "format": "email",
            "title": "Email",
            "type": "string"
          },
          "id": {
            "avantos_type": "short-text",
            "title": "ID",
            "type": "string"
          },
          "multi_select": {
            "avantos_type": "multi-select",
            "items": {
              "enum": [
                "foo",
                "bar",
                "foobar"
              ],
              "type": "string"
            },
            "type": "array",
            "uniqueItems": true
          },
          "name": {
            "avantos_type": "short-text",
            "title": "Name",
            "type": "string"
          },
          "notes": {
            "avantos_type": "multi-line-text",
            "title": "Notes",
            "type": "string"
          }
        },
        "required": [
          "id",
          "name",
          "email"
        ]
      ,
        "button": {
          "selector_field": "title",
          "payload_fields": {
            "userId": {
              "type": "form_field",
              "value": "id"
            }
          },
          "endpoint_id": "te_01jk7ap2r0ewfbrfd53sx46hd2"
        },
        "dynamic_checkbox_group": {
          "selector_field": "title",
          "payload_fields": {
            "userId": {
              "type": "form_field",
              "value": "id"
            }
          },
          "endpoint_id": "te_01jk7ap2r0ewfbrfd53sx46hd2"
        },
        "dynamic_object": {
          "selector_field": "title",
          "payload_fields": {
            "userId": {
              "type": "form_field",
              "value": "id"
            }
          },
          "endpoint_id": "te_01jk7ap2r0ewfbrfd53sx46hd2"
        }
      }
    },
    
  ],
  "branches": [],
  "triggers": []
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedActionGraph),
  })
) as jest.Mock;

test("renders the page with all components", async () => {
  await act(async () => {
    render(<FormProvider>
      <GraphPage />
    </FormProvider>);
  });


  expect(screen.getByTestId("chart-container")).toBeInTheDocument();
  expect(screen.queryByTestId("modal")).toBeNull();
  expect(screen.queryByTestId("form")).toBeNull();
});
