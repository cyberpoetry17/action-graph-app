import { act, render, screen } from "@testing-library/react";
import GraphPage from "./GraphPage";
import { FormProvider } from "../../store";


const defaultGraph = {
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
      "id": "test",
      "name": "test form",
      "description": "test",
      "is_reusable": false,
      "field_schema": {
        "type": "object",
        "properties": {
          "button": {
            "test_type": "button",
            "title": "Button",
            "type": "object"
          },
          "dynamic_test_type": {
            "some_type": "test-group",
            "items": {
              "enum": [
                "test1",
                "test2",
                "test3"
              ],
              "type": "string"
            },
            "type": "array",
            "uniqueItems": true
          },
          "test_oject": {
            "some_type": "object-enum",
            "enum": null,
            "title": "test object",
            "type": "object"
          },
          "email": {
            "some_type": "short-text",
            "format": "email",
            "title": "Email",
            "type": "string"
          },
          "id": {
            "some_type": "short-text",
            "title": "ID",
            "type": "string"
          },
          "multi_select": {
            "some_type": "multi-select",
            "items": {
              "enum": [
                "test",
                "test",
                "tes"
              ],
              "type": "string"
            },
            "type": "array",
            "uniqueItems": true
          },
          "name": {
            "some_type": "short-text",
            "title": "Name",
            "type": "string"
          },
          "notes": {
            "some_type": "multi-line-text",
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
          "test_field": "title",
          "test_payload": {
            "testId": {
              "type": "form_field",
              "value": "id"
            }
          },
          "test_endpoint": "test1"
        },
        "test_checkbox": {
          "test_selector": "title",
          "test_payload": {
            "userId": {
              "type": "form_field",
              "value": "id"
            }
          },
          "test_endpoint": "test2"
        },
        "test_object": {
          "test_selector": "title",
          "test_payload": {
            "userId": {
              "type": "form_field",
              "value": "id"
            }
          },
          "test_endpoint": "test3"
        }
      }
    },
    
  ],
  "branches": [],
  "triggers": []
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(defaultGraph),
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
