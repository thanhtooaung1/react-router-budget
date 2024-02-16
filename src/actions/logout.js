// rrd imports
import { redirect } from "react-router";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
  //remove data
  deleteItem({ key: "userName" });
  toast.success("You've deleted account!");
  //redirect
  return redirect("/");
}
