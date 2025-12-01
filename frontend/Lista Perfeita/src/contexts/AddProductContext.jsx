import { createContext } from "react";

//context pois não foi possível passar pelos props
export const AddProductContext = createContext({
  listaId: null,
  onAdd: () => {}
});

