import DataModel from "../lib/DataModel";

export const uniqueHashModel = new DataModel(
  "Unique SHA256 Hash",
  {
    "string1": {
      "label": "String 1",
      "type": "string",
      "readOnly": false,
      "calculate": null
    },
    "string2": {
      "label": "String 2",
      "type": "string",
      "readOnly": false,
      "calculate": null
    },
    "hash": {
      "label": "Hash",
      "type": "string",
      "readOnly": true,
      "calculate": "sha256(string1, string2)"
    }
  }
)