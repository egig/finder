<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<title></title>
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="demo/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
<link href="demo/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">

<link href="/../finder.css" rel="stylesheet">
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

<script type="text/javascript" src="/demo/lib/jquery.min.js"></script>
<script type="text/javascript" src="/demo/lib/jquery.form.min.js"></script>
<script type="text/javascript" src="/demo/lib/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="/demo/lib/bootstrap-contextmenu.js"></script>

<!-- this demo also used for developement purpose, so we will just use the src instead of dist -->
<script src="/../src/DOM.js"></script>
<script src="/../src/tree.js"></script>
<script src="/../src/file.js"></script>
<script src="/../src/finder.js"></script>

<!-- but if you in production mode, it's recomended to use minified version -->
<!-- <script src="/../dis/finder.min.js"></script> -->

<script type="text/javascript">
	(function($){

		$('#finder').dtfinder({
			url: 'demo/server.php',
			width: '1000px',
			permissions: {
				create: 1,
				move: 1,
				delete: 1,
			},
		});

	})(jQuery);
</script>
</body>
</html>