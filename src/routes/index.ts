import generate from '../controller/generate';
import { BaseRoute } from './baseRoute';

const index: BaseRoute = async function (request, env, ctx) {
	switch (request.method) {
		case 'GET': {
			const html = `
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Online Log Service</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
		<script>
			function generate() {
				fetch('/', { method: 'POST' })
				.then((response) => {
					return response.json();
				})
				.then((json) => {
					const protocol = (new URL(window.location.href)).protocol;
					const host = (new URL(window.location.href)).host;
					const url = protocol + '//' + host + '/log/' + json.id;
					const field = document.getElementById('result');
					field.value = url;
				});
			}
			function copyToClipboard() {
				const field = document.getElementById('result');
				if(navigator.clipboard) {
					navigator.clipboard.writeText(field.value);
				} else {
					field.select();
					field.setSelectionRange(0, 99999);
					document.execCommand('copy');
				}
			}
			function goToUrl() {
				const field = document.getElementById('result');
				window.open(field.value, '_blank');
			}
		</script>
	</head>
	<body>
		<div class="container d-flex flex-column justify-content-center align-items-center" style="height: 90vh;">
			<button class="btn btn-primary" onClick="generate()">Generate</button>
			<div class="col-lg-6 col-md-9 col-sm-12 mt-3">
				<div class="input-group">
					<button type="button" class="btn btn-outline-secondary" onClick="copyToClipboard()">Copy</button>
					<input type="text" id="result" class="form-control" style="text-align: center;" onClick="this.select();" readonly>
					<button type="button" class="btn btn-outline-secondary" onClick="goToUrl()">Goto</button>
				</div>
			</div>
			<p>POST to the endpoint to pending logs.</p>
		</div>
		<footer>
			<p class="text-center">Source Code on <a href="https://github.com/kj415j45/worker-log">GitHub</a></p>
			<p class="text-center">Powered by <a href="https://workers.cloudflare.com/">Cloudflare Workers</a></p>
		</footer>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
	</body>
</html>
`;
			return new Response(html, {
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				},
			});
		}
		case 'POST': {
			const id = await generate(env, { suffix: request.headers.get('cf-ray') });
			return Response.json({ id });
		}
	}
	return new Response('Hello worker!');
};

export default index;
