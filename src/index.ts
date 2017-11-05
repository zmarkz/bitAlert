import Server from "./server";

import container from "./libs/ioc";
import { IServerConfig } from "../configurations/interfaces";

const config = container.get<IServerConfig>("IServerConfig");

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

//Starting Application Server
Server.start(() => {
});
