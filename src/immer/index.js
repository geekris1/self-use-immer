import { Immer } from "./core/immerClass";

const immer = new Immer();
export const produce = immer.produce;
export default produce;
