import { auth } from "~~/lib/auth";

export default defineEventHandler(async (event) => {
	return auth.handler(toWebRequest(event));
});
