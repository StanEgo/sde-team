import "./presets";

import express from "express";
import { Aspect } from "./models/aspects";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";

import { root } from "./functors/app";
import { APP_HTTP_PORT, APP_TLS_PORT } from "./config";
import { connection } from "./db/index";
import { User } from "./models/index";

const app = express();

app.use(cookieParser());
app.use((req, res, next) => {
	const start = {
		[Aspect.HttpRequest]: req,
		[Aspect.HttpResponse]: res,
	};

	connection
		.then((connection) => {
			let user = new User();
			user.email = "22@ss.cc";
			user.name = "name";
			user.password = "pas";

			return connection.manager.save(user).then((user) => {
				console.log("user has been saved. user id is", user.id);
			});
		})
		.catch((error) => console.log(error));

	root.map(start);
});

http.createServer(app).listen(APP_HTTP_PORT, () => {
	console.log(`Insecure server is running at http://localhost:${APP_HTTP_PORT}`);
});
https
	.createServer(
		{
			key: fs.readFileSync(path.join(__dirname, "./../dev/localhost.key")),
			cert: fs.readFileSync(path.join(__dirname, "./../dev/localhost.crt")),
		},
		app
	)
	.listen(APP_TLS_PORT, () => {
		console.log(`Secure server is running at https://localhost:${APP_TLS_PORT}`);
	});