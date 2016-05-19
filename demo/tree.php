<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<title></title>
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="/demo/deps/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="/demo/deps/fontawesome/css/font-awesome.min.css" rel="stylesheet">

<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>

<div id="dtree"></div>

<script type="text/javascript" src="/demo/deps/jquery/dist/jquery.min.js"></script>

<!-- if you in production mode, it's recomended to use minified version -->
<script src="/../src/js/jquery.boilerplate.js"></script>
<script src="/../src/js/tree.js"></script>


<script type="text/javascript">
	(function($){

		$("#dtree").dttree({
			nodes: [
				{path: '/', text: '/root', nodes: [
					{path: '/test', text: "test" },
					{path: 'xxx', text: "test2", expand: true, nodes: [
						{path: '/test3', text: "test3" },
					]}
				]}
			]
		});

	})(jQuery);
</script>
</body>
</html>