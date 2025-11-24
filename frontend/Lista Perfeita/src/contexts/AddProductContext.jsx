import { createContext } from "react";

export const AddProductContext = createContext({
  listaId: null,
  onAdd: () => {}
});

