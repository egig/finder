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

<link href="/../dist/css/finder.css" rel="stylesheet">
<link rel="stylesheet" href="">
<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<link rel="shortcut icon" href="">
<style type="text/css">
	#finder {
		padding: 10px;
	}
</style>
</head>
<body>

<div id="finder"></div>

<script type="text/javascript" src="/demo/deps/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/demo/deps/jquery-form/jquery.form.js"></script>
<script type="text/javascript" src="/demo/deps/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/demo/deps/bootstrap-contextmenu/bootstrap-contextmenu.js"></script>
<script type="text/javascript" src="/demo/deps/nunjucks/browser/nunjucks.js"></script>
<script type="text/javascript" src="/demo/deps/underscore/underscore-min.js"></script>
<script type="text/javascript" src="/demo/deps/backbone/backbone-min.js"></script>

<!-- if you in production mode, it's recomended to use minified version -->
<script src="/../dist/js/finder.js?v=<?php echo time() ?>"></script>

<script src="/../src/l10n/id.js"></script>
<script type="text/javascript">
	(function($){

		$('#finder').dtfinder({
			url: 'demo/server.php',
			permissions: {
				create: 1,
				move: 1,
				delete: 1,
			},
			locale: 'id'
		});

	})(jQuery);
</script>
</body>
</html>
