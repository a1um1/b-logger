Bun.serve({
	async fetch(req) {
		try {
			const data = {
				body: await req.text(),
				headers: req.headers,
			};
			const file = Bun.file(`./${Date.now()}.log`);
			const writer = file.writer();
			writer.write(JSON.stringify(data));
			await writer.flush();
			await writer.end();
			return new Response("Logged");
		} catch (error) {
			console.error(error);
			return new Response("Error", {
				status: 500,
				statusText: "Internal Server Error",
			});
		}
	},
});
