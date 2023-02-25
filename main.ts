import { main  as initServer } from "./API/index"


initServer().then(() => {
  console.log("Exiting")
})