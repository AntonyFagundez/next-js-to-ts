import axios from "axios";
import Papa from "papaparse";

import { Product } from "./types";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8pdQqQqgp8t0QTggaQ6PLjQeVQBhgDZmHmyqEm8RFZGEzm5jsIhObfCasuyvSo28wm92anOHWzr3P/pub?output=csv",
        {
          responseType: "blob",
        }
      )
      .then(({ data: axiosData }) => {
        return new Promise<Product[]>((resolve, reject) => {
          Papa.parse(axiosData, {
            header: true,
            complete: ({ data: parseData }) => resolve(parseData as Product[]),
            error: ({ message }) => reject(message),
          });
        });
      });
  },
};
